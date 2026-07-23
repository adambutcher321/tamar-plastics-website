// Postcode district list is best-effort from public UK postcode-district
// boundaries for the towns in the brief's service area. [CONFIRM with
// client / Royal Mail PAF before relying on this for a live "we don't
// cover you" refusal — a false negative turns away a real customer.]
const SERVICE_AREA_DISTRICTS = [
  'PL1', 'PL2', 'PL3', 'PL4', 'PL5', 'PL6', 'PL7', 'PL8', 'PL9', // Plymouth
  'PL10', // Millbrook / Rame Peninsula
  'PL11', // Torpoint
  'PL12', // Saltash, Landrake, St Germans, Trerulefoot, St Mellion
  'PL13', // Looe
  'PL14', // Liskeard
  'PL15', // Launceston
  'PL17', // Callington
  'PL19', // Tavistock
  'PL30', 'PL31', // Bodmin
] as const;

export const SERVICE_AREA_TOWNS = [
  'Saltash', 'Plymouth', 'Torpoint', 'Callington', 'Liskeard', 'Looe',
  'St Germans', 'Landrake', 'Millbrook', 'Tavistock', 'Launceston',
  'Bodmin', 'Trerulefoot', 'St Mellion',
] as const;

export function isInServiceArea(rawPostcode: string): boolean {
  const normalised = rawPostcode.trim().toUpperCase().replace(/\s+/g, '');
  if (!normalised) return false;

  const match = normalised.match(/^([A-Z]{1,2}\d{1,2})\d[A-Z]{2}$/);
  if (!match) return false;

  const district = match[1];
  return (SERVICE_AREA_DISTRICTS as readonly string[]).includes(district);
}
