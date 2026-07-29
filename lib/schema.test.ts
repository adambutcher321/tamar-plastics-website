import { describe, it, expect } from 'vitest';
import {
  buildLocalBusinessSchema,
  buildServiceSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from './schema';

describe('buildLocalBusinessSchema', () => {
  it('includes correct NAP and type', () => {
    const schema = buildLocalBusinessSchema();
    expect(schema['@type']).toBe('HomeAndConstructionBusiness');
    expect(schema.name).toBe('Tamar Plastics Ltd');
    expect(schema.telephone).toBe('+441752841234');
    expect(schema.address.postalCode).toBe('PL12 6TW');
    expect(schema.areaServed).toContain('Saltash');
    expect(schema.openingHoursSpecification[0].opens).toBe('08:00');
    expect(schema.sameAs).toContain('https://www.facebook.com/profile.php?id=61590754130386');
    expect(schema.sameAs).toContain('https://www.instagram.com/tamar.plastics.ltd/?hl=en');
  });
});

describe('buildServiceSchema', () => {
  it('builds a Service node with the given fields', () => {
    const schema = buildServiceSchema({
      name: 'uPVC Doors',
      description: 'Composite and uPVC doors supplied and fitted.',
      url: 'https://example.com/products/doors',
    });
    expect(schema['@type']).toBe('Service');
    expect(schema.name).toBe('uPVC Doors');
    expect(schema.provider.name).toBe('Tamar Plastics Ltd');
  });
});

describe('buildFaqSchema', () => {
  it('maps FAQ pairs into FAQPage mainEntity', () => {
    const schema = buildFaqSchema([
      { question: 'Do you fit as well as supply?', answer: 'Yes, both.' },
    ]);
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0].name).toBe('Do you fit as well as supply?');
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('Yes, both.');
  });
});

describe('buildBreadcrumbSchema', () => {
  it('maps items into an ordered ItemList', () => {
    const schema = buildBreadcrumbSchema([
      { name: 'Home', url: 'https://example.com/' },
      { name: 'Products', url: 'https://example.com/products' },
    ]);
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[1].name).toBe('Products');
  });
});
