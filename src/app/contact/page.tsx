"use client";

import { useState } from "react";
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
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">&#10003;</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">
              Thanks for reaching out!
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Our team will review your details and get back to you within one
              business day.
            </p>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h1 className="font-bold tracking-tight text-text-primary">
                Contact Sales
              </h1>
              <p className="mt-3 text-lg text-text-secondary">
                Tell us about your shipping needs and we&apos;ll get back to you
                with a tailored solution.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Type */}
              <fieldset>
                <legend className="block text-sm font-medium text-text-primary mb-2">
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
                      className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all min-h-[44px] border ${
                        shippingType === type
                          ? "bg-bg-dark text-white border-bg-dark"
                          : "bg-white text-text-secondary border-border hover:border-border-strong"
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
                <label
                  htmlFor="volume"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Weekly Volume <span className="text-red-500">*</span>
                </label>
                <select
                  id="volume"
                  value={weeklyVolume}
                  onChange={(e) => setWeeklyVolume(e.target.value)}
                  required
                  className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
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
                <label
                  htmlFor="postcode"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Collection Postcode <span className="text-red-500">*</span>
                </label>
                <input
                  id="postcode"
                  type="text"
                  value={collectionPostcode}
                  onChange={(e) =>
                    setCollectionPostcode(e.target.value.toUpperCase())
                  }
                  required
                  placeholder="e.g. SW1A 1AA"
                  className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="company"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  placeholder="Your company name"
                  className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Name row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="First name"
                    className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder="Last name"
                    className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7XXX XXXXXX"
                  className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || !shippingType || !weeklyVolume}
                className="w-full min-h-[44px] bg-bg-dark text-white font-medium rounded-lg px-6 py-3 text-sm hover:bg-bg-dark-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
