/**
 * Shared contact form data — used by both the server action and the client form.
 * Must NOT contain 'use server' or 'use client' directives.
 */

export const ENQUIRY_TYPES = [
  'windows',
  'doors',
  'roofline',
  'guttering',
  'cladding',
  'conservatory-roofs',
  'interior',
  'trims-fixings',
  'general',
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export const ENQUIRY_LABELS: Record<EnquiryType, string> = {
  windows:               'Windows',
  doors:                 'Doors',
  roofline:              'Roofline & Fascias',
  guttering:             'Guttering & Drainage',
  cladding:              'Cladding',
  'conservatory-roofs':  'Conservatory Roofs',
  interior:              'Interior Products',
  'trims-fixings':       'Trims & Fixings',
  general:               'General enquiry',
};
