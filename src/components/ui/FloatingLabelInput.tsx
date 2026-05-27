"use client";

import { forwardRef, useId, useState } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  error?: string;
  hint?: string;
};

// ─── FloatingLabelInput ───────────────────────────────────────────────────
type InputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder">;

export const FloatingLabelInput = forwardRef<HTMLInputElement, InputProps>(
  function FloatingLabelInput({ label, error, hint, id, value, onFocus, onBlur, ...props }, ref) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const [focused, setFocused] = useState(false);
    const filled = value !== undefined && value !== null && String(value).length > 0;
    const floated = focused || filled;

    return (
      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          value={value}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          placeholder=" "
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={`peer w-full h-14 rounded-lg border bg-background px-3.5 pt-5 pb-1.5 text-body-md text-text-primary placeholder-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 ${
            error
              ? "border-danger focus:border-danger focus:ring-danger/20"
              : "border-border focus:border-accent"
          }`}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={`pointer-events-none absolute left-3.5 origin-top-left transition-all duration-200 ease-out ${
            floated
              ? "top-2 text-[11px] font-medium tracking-wide"
              : "top-1/2 -translate-y-1/2 text-body-md"
          } ${error ? "text-danger" : floated ? "text-text-secondary" : "text-text-tertiary"}`}
        >
          {label}
        </label>
        {error ? (
          <p id={`${inputId}-error`} className="mt-1.5 text-caption text-danger">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="mt-1.5 text-caption text-text-tertiary">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

// ─── FloatingLabelTextarea ────────────────────────────────────────────────
type TextareaProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "placeholder">;

export const FloatingLabelTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function FloatingLabelTextarea(
    { label, error, hint, id, value, onFocus, onBlur, rows = 4, ...props },
    ref,
  ) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const [focused, setFocused] = useState(false);
    const filled = value !== undefined && value !== null && String(value).length > 0;
    const floated = focused || filled;

    return (
      <div className="relative">
        <textarea
          id={inputId}
          ref={ref}
          value={value}
          rows={rows}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          placeholder=" "
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={`peer w-full rounded-lg border bg-background px-3.5 pt-6 pb-2 text-body-md text-text-primary placeholder-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 resize-y ${
            error
              ? "border-danger focus:border-danger focus:ring-danger/20"
              : "border-border focus:border-accent"
          }`}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={`pointer-events-none absolute left-3.5 origin-top-left transition-all duration-200 ease-out ${
            floated
              ? "top-2 text-[11px] font-medium tracking-wide"
              : "top-4 text-body-md"
          } ${error ? "text-danger" : floated ? "text-text-secondary" : "text-text-tertiary"}`}
        >
          {label}
        </label>
        {error ? (
          <p id={`${inputId}-error`} className="mt-1.5 text-caption text-danger">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="mt-1.5 text-caption text-text-tertiary">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
