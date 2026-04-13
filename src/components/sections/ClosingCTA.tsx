"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface ClosingCTAProps {
  headline?: string;
  subtitle?: string;
}

export default function ClosingCTA({
  headline = "Ready to ship smarter?",
  subtitle = "Join thousands of businesses that trust ITD Global to streamline their logistics.",
}: ClosingCTAProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-bg-dark py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="font-bold tracking-tight text-white">{headline}</h2>
          <p className="mt-4 text-base md:text-lg text-white/60">{subtitle}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="#" variant="primary" surface="dark">Get Started</Button>
            <Button href="/contact" variant="secondary" surface="dark">Contact Sales</Button>
          </div>

          {/* Inline email capture */}
          <div className="mt-10 max-w-md mx-auto">
            {submitted ? (
              <p className="text-sm text-green-400">Thanks! We&apos;ll be in touch shortly.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px]"
                />
                <button
                  type="submit"
                  className="bg-white text-bg-dark font-medium rounded-lg px-5 py-3 text-sm hover:bg-gray-100 transition-colors min-h-[44px]"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
