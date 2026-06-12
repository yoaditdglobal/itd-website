"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MultiSelect from "@/components/ui/MultiSelect";
import { countries } from "@/lib/countries";

const shippingTypes = ["Domestic UK", "Export", "Import"] as const;

const volumeOptions = [
  "50-150",
  "150-300",
  "300-500",
  "500-1000",
  "1000-5000",
  "5000+",
];

const countryOptions = countries.map((c) => ({
  value: c.code,
  label: c.name,
}));

const steps = [
  { num: "01", title: "Send the form", desc: "Two minutes, no commitment." },
  {
    num: "02",
    title: "We run the numbers",
    desc: "We run your volumes and lanes against the carrier network.",
  },
  {
    num: "03",
    title: "You get the rates back",
    desc: "You get the rates back, with an account manager to talk them through.",
  },
];

export default function ContactPage() {
  const [shippingType, setShippingType] = useState("");
  const [mainLanes, setMainLanes] = useState<string[]>([]);
  const [weeklyVolume, setWeeklyVolume] = useState("");
  const [collectionPostcode, setCollectionPostcode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const showMainLanes = shippingType === "Export" || shippingType === "Import";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingType,
          mainLanes: showMainLanes ? mainLanes : undefined,
          weeklyVolume,
          collectionPostcode,
          company: companyName,
          firstName,
          lastName,
          email,
          phone: phone || undefined,
          source: "contact-page",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-light">
              <span className="text-2xl text-success-dark">&#10003;</span>
            </div>
            <h1 className="text-display-lg text-text-primary">
              We&apos;ve got your details.
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary">
              We&apos;ll run your volumes and lanes against the carrier network, and an
              account manager will come back with the rates within one business day.
            </p>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  const fieldClass =
    "w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent";
  const labelClass = "block text-sm font-medium text-text-primary mb-1.5";

  return (
    <section className="bg-bg-secondary py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-white shadow-sm lg:grid-cols-2">
          {/* ── Left: dark branded panel ── */}
          <div className="relative overflow-hidden bg-bg-dark px-6 py-12 sm:px-10 md:py-16">
            <div
              aria-hidden
              className="bg-noise pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-soft-light"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
            />
            <div className="relative">
              <ScrollReveal>
                <span className="mb-5 inline-block rounded-full bg-white/10 px-3 py-1 text-eyebrow tracking-wider text-white/80">
                  Contact Sales
                </span>
                <h1 className="text-display-lg text-white">
                  Tell us what you ship. We&apos;ll tell you what it should cost.
                </h1>
                <p className="mt-5 max-w-md text-body-lg text-white/70">
                  Send your volumes and lanes, and your account manager comes back with
                  what our carrier network can do on price.
                </p>
              </ScrollReveal>

              {/* What happens next */}
              <div className="mt-10 space-y-8">
                {steps.map((s, i) => {
                  const isLast = i === steps.length - 1;
                  return (
                    <ScrollReveal key={s.num} delay={0.1 + i * 0.1}>
                      <div className="relative flex gap-5">
                        <div className="relative w-10 flex-shrink-0">
                          <span
                            aria-hidden
                            className="block text-stat-lg leading-none text-accent-light"
                          >
                            {s.num}
                          </span>
                          {!isLast && (
                            <span
                              aria-hidden
                              className="absolute left-1/2 top-9 h-8 w-px -translate-x-1/2 bg-white/15"
                            />
                          )}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <h2 className="text-heading-md text-white">{s.title}</h2>
                          <p className="mt-1 text-body-sm text-white/65">{s.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: enquiry form ── */}
          <div className="px-6 py-12 sm:px-10 md:py-16">
            <ScrollReveal delay={0.15}>
              <p className="mb-6 text-body-md text-text-secondary">
                Give us the shape of what you ship and we&apos;ll do the digging.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Type */}
                <fieldset>
                  <legend className="mb-2 block text-sm font-medium text-text-primary">
                    Shipping Type <span className="text-red-500">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {shippingTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setShippingType(type);
                          if (type === "Domestic UK") setMainLanes([]);
                        }}
                        className={`min-h-[44px] rounded-lg border px-5 py-2.5 text-sm font-medium transition-all ${
                          shippingType === type
                            ? "border-bg-dark bg-bg-dark text-white"
                            : "border-border bg-white text-text-secondary hover:border-border-strong"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Main Lanes — conditional */}
                {showMainLanes && (
                  <MultiSelect
                    label={`Main Lanes (${shippingType === "Export" ? "destination" : "origin"} countries) *`}
                    options={countryOptions}
                    selected={mainLanes}
                    onChange={setMainLanes}
                    placeholder="Search and select countries..."
                  />
                )}

                {/* Weekly Volume */}
                <div>
                  <label htmlFor="volume" className={labelClass}>
                    Weekly Volume <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="volume"
                    value={weeklyVolume}
                    onChange={(e) => setWeeklyVolume(e.target.value)}
                    required
                    className={`${fieldClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Select weekly volume...
                    </option>
                    {volumeOptions.map((vol) => (
                      <option key={vol} value={vol}>
                        {vol} shipments
                      </option>
                    ))}
                  </select>
                </div>

                {/* Collection Postcode */}
                <div>
                  <label htmlFor="postcode" className={labelClass}>
                    Collection Postcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="postcode"
                    type="text"
                    value={collectionPostcode}
                    onChange={(e) => setCollectionPostcode(e.target.value.toUpperCase())}
                    required
                    placeholder="e.g. SW1A 1AA"
                    className={fieldClass}
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    placeholder="Your company name"
                    className={fieldClass}
                  />
                </div>

                {/* Name row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      placeholder="First name"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      placeholder="Last name"
                      className={fieldClass}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@company.com"
                    className={fieldClass}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7XXX XXXXXX"
                    className={fieldClass}
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting || !shippingType || !weeklyVolume}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-bg-dark px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-bg-dark-card active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                  <span>{submitting ? "Submitting…" : "Submit Enquiry"}</span>
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
