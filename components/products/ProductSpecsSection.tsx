import { Reveal } from '@/components/home/Reveal';
import type { SpecRow } from '@/content/content-types';

interface ProductSpecsSectionProps {
  headline: string;
  rows: SpecRow[];
}

export function ProductSpecsSection({ headline, rows }: ProductSpecsSectionProps) {
  return (
    <div className="pd-specs-grid">
      <Reveal>
        <h2 className="pd-specs-headline">{headline}</h2>
      </Reveal>

      <div>
        {rows.map((row, index) => (
          <Reveal key={row.label} delayMs={index * 80}>
            <div className="pd-spec-row">
              <span className="pd-spec-label">{row.label}</span>
              <span className="pd-spec-value">{row.value}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
