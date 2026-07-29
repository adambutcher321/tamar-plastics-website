export interface ColourStyle {
  background: string;
  border?: string;
  boxShadow?: string;
}

/** Soft off-axis highlight so flat/solid finishes read as glossy injection-molded
 * plastic rather than a flat colour swatch. Layered in front of the base colour. */
const GLOSS = 'radial-gradient(circle at 34% 28%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 46%)';

/** Fine diagonal grain layered over gradient-based wood/foil finishes so they read
 * as a textured foil rather than a flat colour ramp. */
const GRAIN =
  'repeating-linear-gradient(115deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 4px)';

function solid(hex: string, border: string): ColourStyle {
  return { background: `${GLOSS}, ${hex}`, border };
}

function grained(gradient: string, border: string): ColourStyle {
  return { background: `${GRAIN}, ${gradient}`, border };
}

export function getColourStyle(name: string): ColourStyle {
  const n = name.toLowerCase();

  if (n.includes('anthracite')) {
    return solid('#383E42', '2px solid rgba(255,255,255,0.25)');
  }
  if (n.includes('agate')) {
    return solid('#8B8C89', '2px solid rgba(255,255,255,0.25)');
  }
  if (n.includes('chartwell')) {
    return solid('#85A088', '2px solid rgba(255,255,255,0.25)');
  }
  if (n.includes('black ash') || n.includes('cast-iron black')) {
    return grained('linear-gradient(135deg, #2B2C30 0%, #151618 100%)', '2px solid rgba(255,255,255,0.25)');
  }
  if (n.includes('black')) {
    return solid('#111215', '2px solid rgba(255,255,255,0.25)');
  }
  if (n.includes('golden oak')) {
    return grained('linear-gradient(135deg, #B37836 0%, #7D4A1B 100%)', '2px solid #C48B44');
  }
  if (n.includes('irish oak')) {
    return grained('linear-gradient(135deg, #D49B55 0%, #9E6A2A 100%)', '2px solid #E5AA64');
  }
  if (n.includes('rosewood') || n.includes('chestnut')) {
    return grained('linear-gradient(135deg, #592C18 0%, #301408 100%)', '2px solid #733E26');
  }
  if (n.includes('cedar')) {
    return grained('linear-gradient(135deg, #A85D32 0%, #6E3214 100%)', '2px solid #B86E42');
  }
  if (n.includes('cream')) {
    return solid('#EFEBD9', '2px solid rgba(255,255,255,0.3)');
  }
  if (n.includes('smooth white') || n.includes('white diamond') || n.includes('white')) {
    return solid('#F5F7F6', '2px solid rgba(255,255,255,0.4)');
  }
  if (n.includes('slate')) {
    return solid('#474F54', '2px solid rgba(255,255,255,0.25)');
  }
  if (n.includes('terracotta')) {
    return solid('#B85636', '2px solid rgba(255,255,255,0.25)');
  }
  if (n.includes('charcoal')) {
    return solid('#2B2D31', '2px solid rgba(255,255,255,0.25)');
  }
  if (n.includes('sandstone')) {
    return solid('#D4C5A9', '2px solid rgba(255,255,255,0.25)');
  }
  if (n.includes('coastline blue')) {
    return solid('#385A75', '2px solid rgba(255,255,255,0.25)');
  }
  if (n.includes('carrara marble') || n.includes('marble')) {
    return {
      background: 'linear-gradient(135deg, #F0F2F5 0%, #D5D8DC 50%, #E2E5E8 100%)',
      border: '2px solid rgba(255,255,255,0.5)',
    };
  }
  if (n.includes('concrete')) {
    return solid('#6E7377', '2px solid rgba(255,255,255,0.25)');
  }
  if (n.includes('light oak') || n.includes('woodslat')) {
    return grained('linear-gradient(135deg, #C79A63 0%, #8F6531 100%)', '2px solid #D8AA73');
  }
  if (n.includes('brown')) {
    return solid('#4A3326', '2px solid rgba(255,255,255,0.25)');
  }
  if (n.includes('clear') || n.includes('translucent')) {
    return {
      background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(200,220,240,0.3) 100%)',
      border: '2px solid rgba(255,255,255,0.4)',
    };
  }

  return solid('#7A7F85', '2px solid rgba(255,255,255,0.25)');
}
