'use server';

import { isRateLimited } from '@/lib/rate-limit';
import { headers } from 'next/headers';
import { ENQUIRY_TYPES, type EnquiryType } from './enquiry-types';

export interface ContactFormState {
  status: 'idle' | 'success' | 'error';
  /** Field-level validation errors keyed by field name */
  fieldErrors?: Partial<Record<string, string>>;
  /** Top-level error message (rate limit, server fault, etc.) */
  message?: string;
}

/** Strip HTML tags and null bytes; trim whitespace */
function sanitise(value: FormDataEntryValue | null): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')   // strip HTML
    .replace(/\0/g, '')        // strip null bytes
    .trim();
}

/** Validate an e-mail address to a reasonable standard */
function isValidEmail(value: string): boolean {
  return /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/.test(value);
}

/** UK-ish phone: digits, spaces, +, -, (, ) – at least 7 digits total */
function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Contact form Server Action.
 *
 * Email delivery requires the following environment variables:
 *
 *   SMTP_HOST       e.g. smtp.example.com
 *   SMTP_PORT       e.g. 587
 *   SMTP_USER       SMTP username / address
 *   SMTP_PASS       SMTP password
 *   CONTACT_EMAIL_TO  destination inbox, e.g. info@tamarplasticsltd.co.uk
 *
 * Without these, the action still validates and acknowledges the submission —
 * it simply logs the payload to the server console instead of emailing.
 * No email is ever silently discarded; this is explicit by design.
 */
export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // ── Rate limiting ────────────────────────────────────────────────────────
  const headerStore = await headers();
  const ip =
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headerStore.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(`contact:${ip}`)) {
    return {
      status: 'error',
      message: 'Too many submissions. Please wait a moment before trying again.',
    };
  }

  // ── Honeypot ─────────────────────────────────────────────────────────────
  const honeypot = sanitise(formData.get('website'));
  if (honeypot.length > 0) {
    // Return success to avoid tipping off bots
    return { status: 'success' };
  }

  // ── Extract & sanitise ───────────────────────────────────────────────────
  const fullName     = sanitise(formData.get('fullName'));
  const email        = sanitise(formData.get('email'));
  const phone        = sanitise(formData.get('phone'));
  const postcode     = sanitise(formData.get('postcode'));
  const enquiryType  = sanitise(formData.get('enquiryType')) as EnquiryType;
  const message      = sanitise(formData.get('message'));
  const consent      = formData.get('consent') === 'on';

  // ── Validation ───────────────────────────────────────────────────────────
  const fieldErrors: Partial<Record<string, string>> = {};

  if (fullName.length < 2)
    fieldErrors.fullName = 'Please enter your full name.';
  else if (fullName.length > 120)
    fieldErrors.fullName = 'Name is too long (maximum 120 characters).';

  if (!isValidEmail(email))
    fieldErrors.email = 'Please enter a valid email address.';
  else if (email.length > 254)
    fieldErrors.email = 'Email address is too long.';

  if (phone.length > 0 && !isValidPhone(phone))
    fieldErrors.phone = 'Please enter a valid phone number.';
  else if (phone.length > 30)
    fieldErrors.phone = 'Phone number is too long.';

  if (postcode.length > 0 && postcode.length > 12)
    fieldErrors.postcode = 'Please enter a valid postcode or town.';

  if (!ENQUIRY_TYPES.includes(enquiryType))
    fieldErrors.enquiryType = 'Please select an enquiry type.';

  if (message.length < 10)
    fieldErrors.message = 'Please write a short message so we know how to help.';
  else if (message.length > 3000)
    fieldErrors.message = 'Message is too long (maximum 3,000 characters).';

  if (!consent)
    fieldErrors.consent = 'Please accept the privacy notice to continue.';

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', fieldErrors };
  }

  // ── Deliver or queue ─────────────────────────────────────────────────────
  const payload = {
    fullName,
    email,
    phone: phone || '—',
    postcode: postcode || '—',
    enquiryType,
    message,
    submittedAt: new Date().toISOString(),
    ip,
  };

  const canEmail =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_EMAIL_TO;

  if (canEmail) {
    try {
      // Dynamic import so nodemailer doesn't load when SMTP env vars aren't
      // set — keeps the cold-start cost to zero for the common dev case.
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host:   process.env.SMTP_HOST,
        port:   Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT ?? 587) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from:    `"Tamar Plastics Website" <${process.env.SMTP_USER}>`,
        to:      process.env.CONTACT_EMAIL_TO,
        replyTo: email,
        subject: `Contact enquiry — ${enquiryType} — ${fullName}`,
        text: [
          `Name:     ${fullName}`,
          `Email:    ${email}`,
          `Phone:    ${payload.phone}`,
          `Postcode: ${payload.postcode}`,
          `Type:     ${enquiryType}`,
          ``,
          message,
          ``,
          `Submitted: ${payload.submittedAt}  IP: ${ip}`,
        ].join('\n'),
      });
    } catch (err) {
      console.error('[contact] Email delivery failed:', err);
      return {
        status: 'error',
        message:
          'Your message could not be sent right now. Please call us on 01752 841234 or email info@tamarplasticsltd.co.uk directly.',
      };
    }
  } else {
    // No SMTP configured — log payload so nothing is silently lost in dev.
    console.info('[contact] Submission received (no SMTP configured):', payload);
  }

  return { status: 'success' };
}
