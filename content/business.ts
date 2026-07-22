import { SERVICE_AREA_TOWNS } from '@/lib/postcode';

export const BUSINESS = {
  legalName: 'Tamar Plastics Ltd',
  streetAddress: 'Unit 4, Gwel Avon Business Park, Gilston Road',
  addressLocality: 'Saltash',
  addressRegion: 'Cornwall',
  postalCode: 'PL12 6TW',
  addressCountry: 'GB',
  phone: '+441752841234',
  phoneDisplay: '01752 841234',
  email: 'info@tamarplasticsltd.co.uk',
  // [CONFIRM exact site coordinates for Gwel Avon Business Park — this is
  // an approximate Saltash town-centre position, close but not surveyed.]
  geo: { latitude: 50.4079, longitude: -4.2019 },
  hours: {
    opens: '08:00',
    closes: '17:00',
    days: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    ] as const,
  },
  serviceAreaTowns: SERVICE_AREA_TOWNS,
  priceRange: '££',
  predecessor: 'Carlton Plastics',
} as const;
