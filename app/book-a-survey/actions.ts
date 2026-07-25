'use server';

import { isRateLimited } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export interface SurveyFormState {
  status: 'idle' | 'success' | 'error';
  fieldErrors?: Partial<Record<string, string>>;
  message?: string;
  submittedData?: {
    fullName: string;
    email: string;
    phone: string;
    postcode: string;
    projectType: string;
    preferredTime: string;
    preferredDays: string;
    contactMethod: string;
  };
}

/** Strip HTML tags and null bytes; trim whitespace */
function sanitise(value: FormDataEntryValue | null): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/\0/g, '')
    .trim();
}

/** Validate email */
function isValidEmail(value: string): boolean {
  return /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/.test(value);
}

/** Validate UK phone */
function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export async function submitSurveyRequest(
  _prev: SurveyFormState,
  formData: FormData
): Promise<SurveyFormState> {
  // ── Rate limiting ────────────────────────────────────────────────────────
  const headerStore = await headers();
  const ip =
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headerStore.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(`survey:${ip}`)) {
    return {
      status: 'error',
      message: 'Too many requests submitted recently. Please wait a moment before trying again.',
    };
  }

  // ── Honeypot anti-spam check ─────────────────────────────────────────────
  const honeypot = sanitise(formData.get('website'));
  if (honeypot.length > 0) {
    return { status: 'success' };
  }

  // ── Extract & Sanitise Fields ────────────────────────────────────────────
  const projectType    = sanitise(formData.get('projectType'));
  const propertyType   = sanitise(formData.get('propertyType'));
  const projectDetails = sanitise(formData.get('projectDetails'));
  
  const addressLine1   = sanitise(formData.get('addressLine1'));
  const addressLine2   = sanitise(formData.get('addressLine2'));
  const townCity       = sanitise(formData.get('townCity'));
  const postcode       = sanitise(formData.get('postcode'));
  
  const preferredTime  = sanitise(formData.get('preferredTime'));
  const preferredDays  = formData.getAll('preferredDays').map(d => sanitise(d)).filter(Boolean);
  const accessNotes    = sanitise(formData.get('accessNotes'));

  const fullName       = sanitise(formData.get('fullName'));
  const email          = sanitise(formData.get('email'));
  const phone          = sanitise(formData.get('phone'));
  const contactMethod  = sanitise(formData.get('contactMethod')) || 'phone';

  // ── File Upload Processing (Optional Photos) ─────────────────────────────
  const photoFiles     = formData.getAll('photos') as File[];
  const validPhotoNames: string[] = [];
  const MAX_FILE_SIZE  = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES  = ['image/jpeg', 'image/png', 'image/webp'];

  for (const file of photoFiles) {
    if (file && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return {
          status: 'error',
          fieldErrors: { photos: 'One or more photos exceed the maximum allowed size of 5MB.' },
        };
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        return {
          status: 'error',
          fieldErrors: { photos: 'Please upload valid image files (JPG, PNG, or WebP).' },
        };
      }
      validPhotoNames.push(file.name);
    }
  }

  // ── Validation ───────────────────────────────────────────────────────────
  const fieldErrors: Partial<Record<string, string>> = {};

  if (!projectType)
    fieldErrors.projectType = 'Please choose what you would like us to survey.';

  if (!projectDetails || projectDetails.length < 10)
    fieldErrors.projectDetails = 'Please provide a brief description of your project (at least 10 characters).';

  if (!addressLine1 || addressLine1.length < 3)
    fieldErrors.addressLine1 = 'Please enter your street address.';

  if (!townCity || townCity.length < 2)
    fieldErrors.townCity = 'Please enter your town or city.';

  if (!postcode || postcode.length < 4 || postcode.length > 10)
    fieldErrors.postcode = 'Please enter a valid UK postcode.';

  if (!preferredTime)
    fieldErrors.preferredTime = 'Please select a preferred time of day for the visit.';

  if (preferredDays.length === 0)
    fieldErrors.preferredDays = 'Please select at least one preferred day of the week.';

  if (!fullName || fullName.length < 2)
    fieldErrors.fullName = 'Please enter your full name.';

  if (!email || !isValidEmail(email))
    fieldErrors.email = 'Please enter a valid email address.';

  if (!phone || !isValidPhone(phone))
    fieldErrors.phone = 'Please enter a valid UK telephone number.';

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', fieldErrors };
  }

  // ── Construct Payload ───────────────────────────────────────────────────
  const payload = {
    projectType,
    propertyType: propertyType || 'Home / Domestic',
    projectDetails,
    address: {
      line1: addressLine1,
      line2: addressLine2 || '—',
      townCity,
      postcode,
    },
    visitPreferences: {
      preferredTime,
      preferredDays: preferredDays.join(', '),
      accessNotes: accessNotes || '—',
    },
    contact: {
      fullName,
      email,
      phone,
      contactMethod,
    },
    photosCount: validPhotoNames.length,
    submittedAt: new Date().toISOString(),
    ip,
  };

  // ── Email Delivery or Server Logging ────────────────────────────────────
  const canEmail =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_EMAIL_TO;

  if (canEmail) {
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT ?? 587) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Tamar Plastics Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL_TO,
        replyTo: email,
        subject: `New Survey Request — ${projectType} — ${fullName}`,
        text: [
          `NEW SITE SURVEY REQUEST`,
          `======================`,
          `Name:              ${fullName}`,
          `Email:             ${email}`,
          `Phone:             ${phone}`,
          `Preferred Contact: ${contactMethod}`,
          ``,
          `PROJECT DETAILS`,
          `---------------`,
          `Category:          ${projectType}`,
          `Property Type:     ${payload.propertyType}`,
          `Description:`,
          projectDetails,
          ``,
          `SURVEY LOCATION`,
          `---------------`,
          `Address:           ${addressLine1}`,
          `                   ${addressLine2 !== '—' ? addressLine2 : ''}`,
          `Town/City:         ${townCity}`,
          `Postcode:          ${postcode}`,
          ``,
          `PREFERRED VISIT WINDOW`,
          `----------------------`,
          `Time of Day:       ${preferredTime}`,
          `Preferred Days:    ${payload.visitPreferences.preferredDays}`,
          `Access Notes:      ${accessNotes}`,
          `Attached Photos:   ${validPhotoNames.length} file(s)`,
          ``,
          `Submitted: ${payload.submittedAt}  IP: ${ip}`,
        ].join('\n'),
      });
    } catch (err) {
      console.error('[survey] Email dispatch failed:', err);
      return {
        status: 'error',
        message:
          'Your survey request could not be sent. Please call our team on 01752 841234 or email info@tamarplasticsltd.co.uk directly.',
      };
    }
  } else {
    console.info('[survey] Submission received (no SMTP configured):', payload);
  }

  return {
    status: 'success',
    submittedData: {
      fullName,
      email,
      phone,
      postcode,
      projectType,
      preferredTime,
      preferredDays: preferredDays.join(', '),
      contactMethod,
    },
  };
}
