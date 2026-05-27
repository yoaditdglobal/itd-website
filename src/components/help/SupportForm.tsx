"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const issueCategories = [
  { value: "platform", label: "Platform issue (Connexx is down, slow, or behaving unexpectedly)" },
  { value: "carrier", label: "Carrier issue (label printing, manifesting, carrier account)" },
  { value: "billing", label: "Billing (invoices, payments, rate cards)" },
  { value: "onboarding", label: "Onboarding (new account setup, carrier or integration linking)" },
  { value: "integration", label: "Integration (eCommerce platform, ERP, WMS, marketplace)" },
  { value: "other", label: "Other" },
] as const;

const priorities = [
  { value: "low", label: "Low — General question, no operational impact (response within 1 business day)" },
  { value: "medium", label: "Medium — Operational issue with a workaround (response within 4 business hours)" },
  { value: "high", label: "High — Platform-down, no workaround (response within 1 hour, 24/7)" },
] as const;

const acceptedFileTypes = ".png,.jpg,.jpeg,.pdf,.csv,.log,.txt";
const MAX_FILE_SIZE_MB = 10;
const MAX_FILES = 3;

export default function SupportForm() {
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [accountId, setAccountId] = useState("");
  const [issueCategory, setIssueCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [issueSummary, setIssueSummary] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  // Honeypot — invisible to humans, filled by bots.
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ ticketId: string; email: string } | null>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length > MAX_FILES) {
      toast({
        title: "Too many files",
        description: `Attach up to ${MAX_FILES} files per request.`,
      });
      return;
    }
    const oversize = selected.find((f) => f.size > MAX_FILE_SIZE_MB * 1024 * 1024);
    if (oversize) {
      toast({
        title: "File too large",
        description: `${oversize.name} is over ${MAX_FILE_SIZE_MB}MB. Please attach a smaller file.`,
      });
      return;
    }
    setFiles(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      // v1: attachments are not posted to the backend. File upload uses a
      // presigned-URL pattern in a future phase. See help-ia.md.
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          workEmail,
          companyName: companyName || undefined,
          accountId: accountId || undefined,
          issueCategory,
          priority,
          issueSummary,
          description,
          consent,
          website,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const issueList = Array.isArray(data?.issues)
          ? data.issues.map((i: { message: string }) => i.message).join(" ")
          : data?.error;
        throw new Error(issueList || "Something went wrong. Please try again.");
      }

      const data = (await res.json()) as { ticketId: string };
      setSuccess({ ticketId: data.ticketId, email: workEmail });
      toast({
        title: "Request received",
        description: `Your ticket reference is ${data.ticketId}. We have sent a confirmation email.`,
      });
    } catch (err) {
      toast({
        title: "Could not submit",
        description: err instanceof Error ? err.message : "Please try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-xl border border-border p-8 md:p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <h2 className="text-display-lg text-text-primary">
          Request received
        </h2>
        <p className="mt-3 text-text-secondary max-w-md mx-auto">
          Your ticket reference is{" "}
          <span className="font-semibold text-text-primary">{success.ticketId}</span>.
          A confirmation email is on its way to{" "}
          <span className="font-semibold text-text-primary">{success.email}</span>{" "}
          with the reference number and a summary of what you sent. The team is
          reviewing your request and will respond within your priority SLA. If
          you need to add information, reply to the confirmation email.
        </p>
        <Link
          href="/help/centre"
          className="mt-6 inline-flex items-center gap-2 bg-bg-dark text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-bg-dark-card transition-colors"
        >
          Back to Help Centre
        </Link>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot — hidden from sighted users and screen readers */}
        <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Leave blank</label>
          <input
            id="website"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Full name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-1.5">
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            minLength={2}
            maxLength={100}
            placeholder="Jane Patel"
            className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Work email */}
        <div>
          <label htmlFor="workEmail" className="block text-sm font-medium text-text-primary mb-1.5">
            Work email <span className="text-red-500">*</span>
          </label>
          <input
            id="workEmail"
            type="email"
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            required
            placeholder="jane@yourcompany.com"
            className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Company + Account ID row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-text-primary mb-1.5">
              Company name
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              maxLength={100}
              placeholder="Your company"
              className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="accountId" className="block text-sm font-medium text-text-primary mb-1.5">
              Connexx account ID
            </label>
            <input
              id="accountId"
              type="text"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              maxLength={40}
              placeholder="e.g. CNX-12345"
              className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Issue category */}
        <div>
          <label htmlFor="issueCategory" className="block text-sm font-medium text-text-primary mb-1.5">
            Issue category <span className="text-red-500">*</span>
          </label>
          <select
            id="issueCategory"
            value={issueCategory}
            onChange={(e) => setIssueCategory(e.target.value)}
            required
            className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
          >
            <option value="" disabled>
              Choose one...
            </option>
            {issueCategories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-text-primary mb-1.5">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
          >
            <option value="" disabled>
              Choose one...
            </option>
            {priorities.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-text-tertiary leading-relaxed">
            High priority is reserved for production-down incidents. We may
            downgrade non-urgent requests so the team can respond to genuine
            emergencies first.
          </p>
        </div>

        {/* Issue summary */}
        <div>
          <label htmlFor="issueSummary" className="block text-sm font-medium text-text-primary mb-1.5">
            One-line summary <span className="text-red-500">*</span>
          </label>
          <input
            id="issueSummary"
            type="text"
            value={issueSummary}
            onChange={(e) => setIssueSummary(e.target.value)}
            required
            minLength={10}
            maxLength={150}
            placeholder="Shopify orders not syncing since 9am"
            className="w-full min-h-[44px] bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="mt-1.5 text-xs text-text-tertiary">
            {issueSummary.length}/150
          </p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-1.5">
            What&apos;s happening <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={30}
            maxLength={2000}
            rows={6}
            placeholder="Tell us what you were doing, what you expected to happen, and what actually happened. Include order IDs, error messages, and screenshots where useful."
            className="w-full bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent resize-y"
          />
          <p className="mt-1.5 text-xs text-text-tertiary">
            {description.length}/2000
          </p>
        </div>

        {/* Attachments */}
        <div>
          <label htmlFor="attachments" className="block text-sm font-medium text-text-primary mb-1.5">
            Attachments
          </label>
          <input
            id="attachments"
            type="file"
            multiple
            accept={acceptedFileTypes}
            onChange={handleFiles}
            className="w-full text-sm text-text-secondary file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border file:border-border file:bg-white file:text-text-primary file:text-sm file:font-medium file:cursor-pointer hover:file:bg-bg-secondary"
          />
          <p className="mt-1.5 text-xs text-text-tertiary">
            Up to {MAX_FILES} files, {MAX_FILE_SIZE_MB}MB each. PNG, JPG, PDF, CSV, LOG, or TXT.
          </p>
          {files.length > 0 && (
            <ul className="mt-2 space-y-1">
              {files.map((f) => (
                <li key={f.name} className="text-xs text-text-secondary">
                  {f.name} ({(f.size / 1024).toFixed(0)} KB)
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-1 w-4 h-4 rounded border-border text-accent focus:ring-accent"
          />
          <label htmlFor="consent" className="text-sm text-text-secondary">
            I agree to ITD processing this request under the privacy policy.{" "}
            <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting || !consent}
          className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 bg-accent text-white font-medium rounded-lg px-6 py-3 text-sm hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit request"
          )}
        </button>
      </form>
      <Toaster />
    </>
  );
}
