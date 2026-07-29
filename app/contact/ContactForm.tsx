'use client';

import { useActionState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { submitContactForm, type ContactFormState } from './actions';
import { ENQUIRY_TYPES, ENQUIRY_LABELS } from './enquiry-types';


const INITIAL_STATE: ContactFormState = { status: 'idle' };


interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, error, hint, optional, children }: FieldProps) {
  return (
    <div className="cf-field" data-error={!!error}>
      <label htmlFor={id} className="cf-label">
        {label}
        {optional && <span className="cf-optional"> — optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="cf-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="cf-error" id={`${id}-error`} role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, INITIAL_STATE);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successRef      = useRef<HTMLDivElement>(null);

  // Move focus to the error summary when validation fails
  useEffect(() => {
    if (state.status === 'error' && state.fieldErrors) {
      errorSummaryRef.current?.focus();
    }
    if (state.status === 'success') {
      successRef.current?.focus();
    }
  }, [state]);

  const fe = state.fieldErrors ?? {};

  // ── Success state ────────────────────────────────────────────────────────
  if (state.status === 'success') {
    return (
      <div
        ref={successRef}
        className="cf-success"
        tabIndex={-1}
        aria-label="Enquiry received"
        role="region"
      >
        <div className="cf-success-mark" aria-hidden="true"><Check size={20} strokeWidth={2.5} /></div>
        <h2 className="cf-success-heading">Enquiry received</h2>
        <p className="cf-success-body">
          Thank you. We'll be in touch shortly — usually within one business day.
          If your enquiry is urgent, call us on{' '}
          <a href="tel:+441752841234" className="cf-link">01752 841234</a>.
        </p>
      </div>
    );
  }

  const hasFieldErrors = Object.keys(fe).length > 0;

  return (
    <form action={formAction} noValidate aria-label="Contact enquiry form">
      {/* Honeypot — hidden from real users, bots fill it in */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="cf-honeypot"
      />

      {/* Error summary */}
      {(hasFieldErrors || (state.status === 'error' && state.message)) && (
        <div
          ref={errorSummaryRef}
          className="cf-error-summary"
          tabIndex={-1}
          role="alert"
          aria-labelledby="cf-error-summary-heading"
        >
          <p id="cf-error-summary-heading" className="cf-error-summary-heading">
            There are a few things to check before sending:
          </p>
          {state.message && <p className="cf-error-summary-item">{state.message}</p>}
          {hasFieldErrors && (
            <ul className="cf-error-summary-list">
              {Object.entries(fe).map(([field, msg]) => (
                <li key={field}>
                  <a href={`#${field}`} className="cf-error-summary-link">
                    {msg}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="cf-fields">
        {/* Full name */}
        <Field id="fullName" label="Full name" error={fe.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-describedby={fe.fullName ? 'fullName-error' : undefined}
            aria-invalid={!!fe.fullName}
            className="cf-input"
            defaultValue={state.status === 'error' ? undefined : undefined}
          />
        </Field>

        {/* Email */}
        <Field id="email" label="Email address" error={fe.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-describedby={fe.email ? 'email-error' : undefined}
            aria-invalid={!!fe.email}
            className="cf-input"
          />
        </Field>

        {/* Phone */}
        <Field
          id="phone"
          label="Phone number"
          error={fe.phone}
          hint="We may call to clarify details before preparing a quote."
          optional
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-describedby={fe.phone ? 'phone-error' : 'phone-hint'}
            aria-invalid={!!fe.phone}
            className="cf-input"
          />
        </Field>

        {/* Postcode */}
        <Field
          id="postcode"
          label="Postcode or nearest town"
          error={fe.postcode}
          hint="Helps us confirm your installation area or nearest delivery route."
          optional
        >
          <input
            id="postcode"
            name="postcode"
            type="text"
            autoComplete="postal-code"
            aria-describedby={fe.postcode ? 'postcode-error' : 'postcode-hint'}
            aria-invalid={!!fe.postcode}
            className="cf-input cf-input--half"
          />
        </Field>

        {/* Enquiry type */}
        <Field id="enquiryType" label="What's the enquiry about?" error={fe.enquiryType}>
          <select
            id="enquiryType"
            name="enquiryType"
            required
            aria-required="true"
            aria-describedby={fe.enquiryType ? 'enquiryType-error' : undefined}
            aria-invalid={!!fe.enquiryType}
            className="cf-select"
            defaultValue=""
          >
            <option value="" disabled>Select a category…</option>
            {ENQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {ENQUIRY_LABELS[type]}
              </option>
            ))}
          </select>
        </Field>

        {/* Message */}
        <Field
          id="message"
          label="Message"
          error={fe.message}
          hint="Dimensions, quantities and any relevant details are helpful but not required at this stage."
        >
          <textarea
            id="message"
            name="message"
            required
            aria-required="true"
            rows={6}
            aria-describedby={fe.message ? 'message-error' : 'message-hint'}
            aria-invalid={!!fe.message}
            className="cf-textarea"
          />
        </Field>

        {/* Privacy consent */}
        <div className="cf-consent" data-error={!!fe.consent}>
          <div className="cf-checkbox-row">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              aria-required="true"
              aria-describedby={fe.consent ? 'consent-error' : undefined}
              aria-invalid={!!fe.consent}
              className="cf-checkbox"
            />
            <label htmlFor="consent" className="cf-consent-label">
              I understand that Tamar Plastics Ltd will use my contact details to respond to this enquiry.
              We don't share your information with third parties.
            </label>
          </div>
          {fe.consent && (
            <p className="cf-error" id="consent-error" role="alert" aria-live="polite">
              {fe.consent}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="cf-submit-row">
        <button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          className="cf-submit"
        >
          {isPending ? (
            <>
              <span className="cf-spinner" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Send enquiry'
          )}
        </button>
        <p className="cf-submit-note">No obligation. We aim to respond within one business day.</p>
      </div>
    </form>
  );
}
