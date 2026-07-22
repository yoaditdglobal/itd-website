import { buildMetadata } from "@/lib/metadata";
import ContactForm from "./ContactForm";

export const metadata = buildMetadata({
  title: "Contact Sales",
  description:
    "Tell ITD Global what you ship — your volumes and lanes — and an account manager returns within one business day with what the carrier network can do on price.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactForm />;
}
