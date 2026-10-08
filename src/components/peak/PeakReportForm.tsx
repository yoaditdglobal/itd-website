"use client";

import { useEffect, useId, useRef, useState, type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { LEAD_EVENT, leadParams, track } from "@/lib/analytics";
import { isFreeMail, setUnlocked } from "./peak-storage";
import type {
  CurveTabKey,
  PeakDialogCopy,
  PeakReportRequest,
  PeakReportResponse,
  PeakTrigger,
  PeakUtms,
} from "./peak-types";

type Field = "firstName" | "lastName" | "email" | "company" | "weeklyVolume" | "shipsWithItd";

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  weeklyVolume: string;
  shipsWithItd: "" | "yes" | "no";
  marketingOptIn: boolean;
  website: string; // honeypot
};

export type FormState = {
  values: FormValues;
  touched: Partial<Record<Field, boolean>>;
  status: "idle" | "submitting" | "success" | "error";
  reportUrl: string | null;
  submitAttempt: number;
};

export function emptyValues(): FormState {
  return {
    values: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      weeklyVolume: "",
      shipsWithItd: "",
      marketingOptIn: false,
      website: "",
    },
    touched: {},
    status: "idle",
    reportUrl: null,
    submitAttempt: 0,
  };
}

const MESSAGES: Record<Field, string> = {
  firstName: "Please enter your first name",
  lastName: "Please enter your last name",
  email: "Please enter a valid email address",
  company: "Please enter your company",
  weeklyVolume: "Please choose a volume",
  shipsWithItd: "Please tell us if you ship with ITD today",
};

const LABELS: Record<Field, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Work email",
  company: "Company",
  weeklyVolume: "Weekly parcel volume",
  shipsWithItd: "Do you ship with ITD today?",
};

const FIELD_ORDER: Field[] = ["firstName", "lastName", "email", "company", "weeklyVolume", "shipsWithItd"];

function validate(v: FormValues): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (!v.firstName.trim()) e.firstName = MESSAGES.firstName;
  if (!v.lastName.trim()) e.lastName = MESSAGES.lastName;
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = MESSAGES.email;
  if (!v.company.trim()) e.company = MESSAGES.company;
  if (!v.weeklyVolume) e.weeklyVolume = MESSAGES.weeklyVolume;
  if (!v.shipsWithItd) e.shipsWithItd = MESSAGES.shipsWithItd;
  return e;
}

type Props = {
  state: FormState;
  setState: Dispatch<SetStateAction<FormState>>;
  edition: string;
  trigger: PeakTrigger;
  cardId?: string;
  curveTab: CurveTabKey;
  copy: PeakDialogCopy;
  getContext: () => { utms: PeakUtms; pagePath: string };
  onFirstInteraction: () => void;
  onSuccess: (reportUrl: string) => void;
  trackDownload: (opts: { unlockedFromStorage: boolean }) => void;
};

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export default function PeakReportForm({
  state,
  setState,
  edition,
  trigger,
  cardId,
  curveTab,
  copy,
  getContext,
  onFirstInteraction,
  onSuccess,
  trackDownload,
}: Props) {
  const uid = useId();
  const fid = (f: Field | "optin" | "summary" | "error") => `${uid}-${f}`;
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLAnchorElement>(null);
  const [serverError, setServerError] = useState(false);

  const { values, touched, status } = state;
  const errors = validate(values);
  const showError = (f: Field) => (touched[f] || state.submitAttempt > 0) && errors[f];
  const visibleErrors = FIELD_ORDER.filter((f) => showError(f));

  // Move focus to the error summary after a failed submit, or to the download
  // button once the report is ready.
  useEffect(() => {
    if (state.submitAttempt > 0 && visibleErrors.length > 0) summaryRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.submitAttempt]);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = <K extends keyof FormValues>(k: K, v: FormValues[K]) => {
    onFirstInteraction();
    setState((s) => ({ ...s, values: { ...s.values, [k]: v } }));
  };
  const touch = (f: Field) => setState((s) => ({ ...s, touched: { ...s.touched, [f]: true } }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setServerError(false);
    if (Object.keys(errors).length > 0) {
      setState((s) => ({
        ...s,
        submitAttempt: s.submitAttempt + 1,
        touched: Object.fromEntries(FIELD_ORDER.map((f) => [f, true])),
      }));
      return;
    }
    setState((s) => ({ ...s, status: "submitting" }));

    const { utms, pagePath } = getContext();
    const body: PeakReportRequest = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      weeklyVolume: values.weeklyVolume,
      shipsWithItd: values.shipsWithItd as "yes" | "no",
      marketingOptIn: values.marketingOptIn,
      website: values.website,
      context: {
        reportEdition: edition,
        curveTab,
        trigger,
        cardId,
        pagePath,
        utmSource: utms.utm_source,
        utmMedium: utms.utm_medium,
        utmCampaign: utms.utm_campaign,
        utmContent: utms.utm_content,
      },
    };

    try {
      const res = await fetch("/api/peak-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as PeakReportResponse;
      const reportUrl = json.reportUrl;
      const isCustomer = values.shipsWithItd === "yes";

      // Lead conversion — counted for prospects AND existing customers (Yoad's
      // call); `customer` lets GA4 segment them. Pushed to the GTM dataLayer so
      // existing GTM tags receive it, like the contact form.
      const w = window as DataLayerWindow;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: LEAD_EVENT,
        form_name: "peak_report",
        ...leadParams("peak_report", {
          weekly_volume: values.weeklyVolume,
          curve_tab: curveTab,
          trigger,
          report_edition: edition,
          customer: isCustomer,
        }),
      });
      if (isCustomer) track("peak_customer_download", { report_edition: edition });

      setUnlocked(edition);
      onSuccess(reportUrl);
      setState((s) => ({ ...s, status: "success", reportUrl }));
    } catch {
      setServerError(true);
      setState((s) => ({ ...s, status: "error" }));
    }
  };

  if (status === "success" && state.reportUrl) {
    return (
      <div className="peak-form__success" role="status">
        <a
          ref={successRef}
          href={state.reportUrl}
          target="_blank"
          rel="noopener"
          className="peak-btn peak-btn--cobalt peak-btn--lg"
          onClick={() => trackDownload({ unlockedFromStorage: false })}
        >
          {copy.successButton}
        </a>
        <Link href="/contact?source=peak" className="peak-link peak-form__secondary">
          {copy.successSecondary}
        </Link>
      </div>
    );
  }

  const busy = status === "submitting";
  const freeMail = values.email.trim().length > 3 && touched.email && isFreeMail(values.email);

  return (
    <form onSubmit={submit} noValidate className="peak-form" aria-busy={busy}>
      {visibleErrors.length > 0 && (
        <div
          ref={summaryRef}
          id={fid("summary")}
          role="alert"
          tabIndex={-1}
          className="peak-form__summary"
        >
          <p className="peak-form__summary-title">Please check the following:</p>
          <ul>
            {visibleErrors.map((f) => (
              <li key={f}>
                <a href={`#${fid(f)}`} onClick={(e) => { e.preventDefault(); document.getElementById(fid(f))?.focus(); }}>
                  {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset disabled={busy} className="peak-form__fields">
        <div className="peak-form__row">
          <FloatingLabelInput
            id={fid("firstName")}
            label={LABELS.firstName}
            name="firstName"
            autoComplete="given-name"
            required
            value={values.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            onBlur={() => touch("firstName")}
            error={showError("firstName") ? errors.firstName : undefined}
          />
          <FloatingLabelInput
            id={fid("lastName")}
            label={LABELS.lastName}
            name="lastName"
            autoComplete="family-name"
            required
            value={values.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            onBlur={() => touch("lastName")}
            error={showError("lastName") ? errors.lastName : undefined}
          />
        </div>
        <FloatingLabelInput
          id={fid("email")}
          label={LABELS.email}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          onBlur={() => touch("email")}
          error={showError("email") ? errors.email : undefined}
          hint={freeMail && !showError("email") ? copy.freeMailHint : undefined}
        />
        <FloatingLabelInput
          id={fid("company")}
          label={LABELS.company}
          name="company"
          autoComplete="organization"
          required
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
          onBlur={() => touch("company")}
          error={showError("company") ? errors.company : undefined}
        />

        <div className="peak-form__select-wrap">
          <label htmlFor={fid("weeklyVolume")} className="text-label peak-form__label">
            {LABELS.weeklyVolume}
          </label>
          <select
            id={fid("weeklyVolume")}
            name="weeklyVolume"
            required
            value={values.weeklyVolume}
            onChange={(e) => set("weeklyVolume", e.target.value)}
            onBlur={() => touch("weeklyVolume")}
            aria-invalid={showError("weeklyVolume") ? "true" : undefined}
            aria-describedby={showError("weeklyVolume") ? fid("weeklyVolume") + "-error" : undefined}
            className={`peak-form__select${showError("weeklyVolume") ? " is-invalid" : ""}`}
          >
            <option value="" disabled>
              Choose a range
            </option>
            {copy.volumeBands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {showError("weeklyVolume") && (
            <p id={fid("weeklyVolume") + "-error"} className="text-caption peak-form__error">
              {errors.weeklyVolume}
            </p>
          )}
        </div>

        <div
          role="group"
          aria-labelledby={fid("shipsWithItd") + "-label"}
          aria-describedby={showError("shipsWithItd") ? fid("shipsWithItd") + "-error" : undefined}
          className="peak-form__radio-wrap"
        >
          <p id={fid("shipsWithItd") + "-label"} className="text-label peak-form__label">
            {LABELS.shipsWithItd}
          </p>
          <RadioGroup
            id={fid("shipsWithItd")}
            value={values.shipsWithItd}
            onValueChange={(v) => {
              set("shipsWithItd", v as "yes" | "no");
              touch("shipsWithItd");
            }}
            className="peak-form__radios"
            aria-invalid={showError("shipsWithItd") ? "true" : undefined}
          >
            <label className="peak-form__radio">
              <RadioGroupItem value="yes" /> <span>Yes, I&rsquo;m a customer</span>
            </label>
            <label className="peak-form__radio">
              <RadioGroupItem value="no" /> <span>Not yet</span>
            </label>
          </RadioGroup>
          {showError("shipsWithItd") && (
            <p id={fid("shipsWithItd") + "-error"} className="text-caption peak-form__error">
              {errors.shipsWithItd}
            </p>
          )}
        </div>

        <label htmlFor={fid("optin")} className="peak-form__optin">
          <Checkbox
            id={fid("optin")}
            checked={values.marketingOptIn}
            onCheckedChange={(c) => set("marketingOptIn", c === true)}
          />
          <span className="text-body-sm">{copy.optIn}</span>
        </label>

        {/* Honeypot — must stay empty (same pattern as /api/contact). */}
        <input
          type="text"
          name="website"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
      </fieldset>

      <p className="text-caption peak-form__privacy">
        We&rsquo;ll use your details to send the report and follow up about your peak plan. See our{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>

      {serverError && (
        <p role="alert" id={fid("error")} className="peak-form__server-error text-body-sm">
          Something went wrong on our side. Try again, or{" "}
          <Link href="/contact?source=peak" className="underline underline-offset-2">
            contact us
          </Link>{" "}
          and we&rsquo;ll send it over.
        </p>
      )}

      <button type="submit" className="peak-btn peak-btn--cobalt peak-btn--lg w-full" disabled={busy}>
        {busy ? (
          <>
            <Loader2 className="peak-spin" aria-hidden /> Sending…
          </>
        ) : (
          copy.submit
        )}
      </button>
    </form>
  );
}
