import type { LucideIcon } from 'lucide-react';
import {
  Lock, Zap, ShieldCheck, Leaf, CloudRain, Sun, Wrench, Droplets, Landmark,
  Flame, Wind, Palette, Thermometer, Building2, ShowerHead, Timer, Gem, Ruler, Truck,
  Award, BadgeCheck,
} from 'lucide-react';
import { Reveal } from '@/components/home/Reveal';
import type { SpecRow } from '@/content/content-types';

export interface TechHighlightInfo {
  summary: string;
  badges: { label: string; icon: LucideIcon }[];
  keyPoints: { icon: LucideIcon; title: string; text: string }[];
}

function badges(labels: string[]): { label: string; icon: LucideIcon }[] {
  const icons = [ShieldCheck, Award, BadgeCheck, ShieldCheck];
  return labels.map((label, i) => ({ label, icon: icons[i % icons.length] }));
}

export function getTechHighlightInfo(slug?: string): TechHighlightInfo {
  switch (slug) {
    case 'doors':
      return {
        summary:
          'Solid 48mm timber-core construction engineered for maximum structural rigidity, thermal retention, and attack resistance.',
        badges: badges(['Ultion 3-Star Diamond', 'PAS 24:2016 Security', 'Secured by Design', '10-Year Guarantee']),
        keyPoints: [
          { icon: Lock, title: 'High-Security Locking', text: 'Ultion 3-Star anti-snap cylinder with £2,000 security guarantee.' },
          { icon: Zap, title: 'Thermal Efficiency', text: '1.2 W/m²K U-Value compliant with UK Building Regulations Part L.' },
          { icon: ShieldCheck, title: 'Impact Resistance', text: 'Through-colour GRP skin resistant to scratches, dents, and weather.' },
        ],
      };
    case 'windows':
      return {
        summary:
          'Engineered to exceed UK Building Regulations Part L & Part Q with precision multi-chamber lead-free profile technology.',
        badges: badges(['BFRC Energy A+', 'PAS 24:2016 Security', 'BBA Certified', '10-Year Guarantee']),
        keyPoints: [
          { icon: Zap, title: 'Thermal Performance', text: 'U-Value 1.2 W/m²K (Double Glazed) / 0.8 W/m²K (Triple Glazed).' },
          { icon: Lock, title: 'Security Hardware', text: 'Yale heavy-duty multi-point shootbolt locking and hinge protectors.' },
          { icon: Leaf, title: 'Eco Profile', text: '100% lead-free multi-chamber uPVC profile with thermal inserts.' },
        ],
      };
    case 'roofline':
      return {
        summary:
          'Heavy-duty 16–18mm structural replacement fascia and soffit systems eliminating maintenance and protecting roof rafters.',
        badges: badges(['BBA Certified', 'Class 1 Fire Rated', 'Lead-Free uPVC', '20-Year Colourfast']),
        keyPoints: [
          { icon: CloudRain, title: 'Rafter Protection', text: 'Eliminates timber rot with structural fascia and concealed ventilation.' },
          { icon: Sun, title: 'UV Stability', text: 'Advanced organotin stabilization preventing discolouration and yellowing.' },
          { icon: Wrench, title: 'Polytop Fixings', text: 'Stainless steel polytop pin fixing system for high wind resistance.' },
        ],
      };
    case 'guttering':
      return {
        summary:
          'High-flow rainwater drainage systems designed for severe UK storm conditions and heavy roof runoff capacity.',
        badges: badges(['4.9 L/s Flow Rate', 'BS EN 607 Compliant', 'Cast-Iron Effect', '10-Year Guarantee']),
        keyPoints: [
          { icon: Droplets, title: 'High Capacity', text: 'Deepflow profile handling 4.9 L/s flow rate to prevent roof overtopping.' },
          { icon: ShieldCheck, title: 'EPDM Seals', text: 'High-elasticity double synthetic rubber gaskets for leak-free joints.' },
          { icon: Landmark, title: 'Architectural Styles', text: 'Available in Deepflow, Ogee, Square, Half-Round & Cast-Iron Effect.' },
        ],
      };
    case 'cladding':
      return {
        summary:
          'Class A fire-rated composite weatherboard and uPVC shiplap cladding for maintenance-free exterior wall insulation.',
        badges: badges(['Class A Fire Rated', 'BBA Approved', '100% Waterproof', '15-Year Guarantee']),
        keyPoints: [
          { icon: Flame, title: 'Fire Safety', text: 'Class A / Euroclass B-s3,d0 fire safety rating for ultimate protection.' },
          { icon: Wind, title: 'Thermal Barrier', text: 'Protects external walls from penetrating damp and wind chill.' },
          { icon: Palette, title: 'Timber Texture', text: 'Deep woodgrain embossed texture in Slate Grey, Anthracite & White.' },
        ],
      };
    case 'conservatory-roofs':
      return {
        summary:
          'High-performance warm roof replacement systems transforming cold conservatories into comfortable year-round living spaces.',
        badges: badges(['0.15 W/m²K U-Value', 'JHAI Approved Spec', 'Structural Calcs', '10-Year Guarantee']),
        keyPoints: [
          { icon: Thermometer, title: 'Thermal Comfort', text: 'Achieves 0.15 W/m²K U-Value, reducing heat loss by up to 80%.' },
          { icon: Building2, title: 'Lightweight Aluminium', text: 'Engineered structural rafter system requiring no footings changes.' },
          { icon: Sun, title: 'Natural Light', text: 'Compatible with slimline aluminium roof lanterns and skyport glazing.' },
        ],
      };
    case 'interior':
      return {
        summary:
          '100% waterproof tongue-and-groove shower wall panels and ceiling boards designed for rapid, grout-free hygiene.',
        badges: badges(['100% Waterproof', 'Class 1 Fire Rated', 'Grout-Free Hygiene', '10-Year Guarantee']),
        keyPoints: [
          { icon: ShowerHead, title: 'Zero Grout', text: '100% mold-free hygienic surface with smooth wipe-clean finish.' },
          { icon: Timer, title: 'Fast Fitting', text: 'Tongue-and-groove interlocking panels fitted directly over tiles.' },
          { icon: Gem, title: 'Luxury Decor', text: 'Available in Carrara Marble, Concrete, Sparkle & Woodslat finishes.' },
        ],
      };
    case 'trims-fixings':
      return {
        summary:
          'Professional-grade architraves, window boards, low-modulus silicones, and structural fixings for trade window installers.',
        badges: badges(['Trade Quantities', 'Low-Modulus Silicone', 'BBA Certified', 'Same-Day Counter Pickup']),
        keyPoints: [
          { icon: Wrench, title: 'Installer Grade', text: 'Neutral cure low-modulus silicones and high-tack expanding foams.' },
          { icon: Ruler, title: 'Precision Trims', text: 'Quad, D-mould, architrave & multi-board uPVC profiles in matching foils.' },
          { icon: Truck, title: 'Trade Counter', text: 'Stocked at Saltash depot for immediate trade counter pickup.' },
        ],
      };
    default:
      return {
        summary:
          'Precision British engineered uPVC and composite building products manufactured to strict UK standards.',
        badges: badges(['UK Manufactured', 'BS EN Standards', '10-Year Guarantee']),
        keyPoints: [
          { icon: ShieldCheck, title: 'Quality Assurance', text: 'Rigorous factory testing for structural integrity and weather tightness.' },
          { icon: Zap, title: 'Energy Efficiency', text: 'Designed for optimal thermal insulation and weather protection.' },
        ],
      };
  }
}

interface ProductSpecsSectionProps {
  rows: SpecRow[];
  slug?: string;
}

export function ProductSpecsSection({ rows, slug }: ProductSpecsSectionProps) {
  const info = getTechHighlightInfo(slug);

  return (
    <div className="pd-specs-grid">
      <div className="pd-specs-left">
        <Reveal delayMs={40}>
          <p className="pd-specs-summary">{info.summary}</p>
        </Reveal>

        {/* Accreditation & Certification Badges */}
        <Reveal delayMs={80}>
          <div className="pd-specs-badges">
            {info.badges.map(({ label, icon: Icon }) => (
              <span key={label} className="pd-spec-badge">
                <Icon className="pd-badge-icon" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Technical Highlights Callout Box */}
        <Reveal delayMs={120}>
          <div className="pd-specs-highlights-box">
            {info.keyPoints.map((pt) => (
              <div key={pt.title} className="pd-highlight-item">
                <pt.icon className="pd-highlight-icon" aria-hidden="true" />
                <div>
                  <div className="pd-highlight-title">{pt.title}</div>
                  <div className="pd-highlight-text">{pt.text}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="pd-specs-right">
        {rows.map((row, index) => (
          <Reveal key={row.label} delayMs={index * 60}>
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
