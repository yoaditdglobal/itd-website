import Anthropic from "@anthropic-ai/sdk";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat/knowledge";
import { rateLimit, clientIp } from "@/lib/server/rate-limit";

// Connexx Assistant streaming endpoint. Streams Claude Haiku 4.5 token-by-token
// over a ReadableStream of plain UTF-8 text. Degrades gracefully when the API key
// is absent (local dev / not yet configured) so the widget never hard-fails.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 340; // keep chat replies short (2–3 sentences); long answers get skimmed
const MAX_MESSAGES = 24; // cap conversation length sent upstream
const MAX_CHARS = 4000; // per-message cap

type Role = "user" | "assistant";
interface InboundMessage {
  role: Role;
  content: string;
}

function textStream(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (rateLimit(ip, { windowMs: 60_000, max: 20, bucket: "chat" })) {
    return textStream(
      "You're sending messages a little fast — give me a moment and try again.",
    );
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages: InboundMessage[] = raw
    .filter(
      (m): m is InboundMessage =>
        !!m &&
        typeof (m as InboundMessage).content === "string" &&
        ((m as InboundMessage).role === "user" ||
          (m as InboundMessage).role === "assistant"),
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response(JSON.stringify({ error: "Expected a trailing user message" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Graceful fallback — keeps the widget usable before the key is configured.
    return textStream(
      "Thanks for your message! Our live assistant isn't switched on in this environment yet — " +
        "but if you leave your details I'll make sure the team gets back to you quickly. " +
        "You can also reach us any time via the Contact page.",
    );
  }

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const claudeStream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: [
            {
              type: "text",
              text: CHAT_SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });

        claudeStream.on("text", (delta) => {
          controller.enqueue(encoder.encode(delta));
        });

        await claudeStream.finalMessage();
        controller.close();
      } catch (err) {
        console.error("[/api/chat] stream error:", err);
        // If nothing has been sent yet this surfaces in the bubble; otherwise it
        // appends to the partial answer.
        try {
          controller.enqueue(
            encoder.encode(
              "\n\nSorry — something went wrong on my end. Please try again, " +
                "or leave your details and the team will follow up.",
            ),
          );
        } catch {
          /* controller may already be closed */
        }
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
