"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
}

/**
 * Minimal code-block component used on /help/developers.
 *
 * v1: monospace `<pre>` with a copy button. No syntax highlighting yet —
 * Shiki at build time is the preferred Next 16 pattern and arrives in a
 * later phase. See docs/drafts/help-developers.md, implementation note 3.
 */
export default function CodeBlock({ code, language = "bash", label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — silently no-op.
    }
  };

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-bg-dark">
      <div className="flex items-center justify-between px-4 py-2.5 bg-bg-dark-card border-b border-white/10">
        <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
          {label ?? language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="text-xs sm:text-sm text-white/90 p-4 overflow-x-auto leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
