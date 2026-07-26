export interface ColourStyle {
  background: string;
  border?: string;
  boxShadow?: string;
}

export function getColourStyle(name: string): ColourStyle {
  const n = name.toLowerCase();

  if (n.includes('anthracite')) {
    return { background: '#383E42', border: '2px solid rgba(255,255,255,0.25)' };
  }
  if (n.includes('agate')) {
    return { background: '#8B8C89', border: '2px solid rgba(255,255,255,0.25)' };
  }
  if (n.includes('chartwell')) {
    return { background: '#85A088', border: '2px solid rgba(255,255,255,0.25)' };
  }
  if (n.includes('black ash') || n.includes('cast-iron black')) {
    return {
      background: 'linear-gradient(135deg, #2B2C30 0%, #151618 100%)',
      border: '2px solid rgba(255,255,255,0.25)',
    };
  }
  if (n.includes('black')) {
    return { background: '#111215', border: '2px solid rgba(255,255,255,0.25)' };
  }
  if (n.includes('golden oak')) {
    return {
      background: 'linear-gradient(135deg, #B37836 0%, #7D4A1B 100%)',
      border: '2px solid #C48B44',
    };
  }
  if (n.includes('irish oak')) {
    return {
      background: 'linear-gradient(135deg, #D49B55 0%, #9E6A2A 100%)',
      border: '2px solid #E5AA64',
    };
  }
  if (n.includes('rosewood') || n.includes('chestnut')) {
    return {
      background: 'linear-gradient(135deg, #592C18 0%, #301408 100%)',
      border: '2px solid #733E26',
    };
  }
  if (n.includes('cedar')) {
    return {
      background: 'linear-gradient(135deg, #A85D32 0%, #6E3214 100%)',
      border: '2px solid #B86E42',
    };
  }
  if (n.includes('cream')) {
    return { background: '#EFEBD9', border: '2px solid rgba(255,255,255,0.3)' };
  }
  if (n.includes('smooth white') || n.includes('white diamond') || n.includes('white')) {
    return { background: '#F5F7F6', border: '2px solid rgba(255,255,255,0.4)' };
  }
  if (n.includes('slate')) {
    return { background: '#474F54', border: '2px solid rgba(255,255,255,0.25)' };
  }
  if (n.includes('terracotta')) {
    return { background: '#B85636', border: '2px solid rgba(255,255,255,0.25)' };
  }
  if (n.includes('charcoal')) {
    return { background: '#2B2D31', border: '2px solid rgba(255,255,255,0.25)' };
  }
  if (n.includes('sandstone')) {
    return { background: '#D4C5A9', border: '2px solid rgba(255,255,255,0.25)' };
  }
  if (n.includes('coastline blue')) {
    return { background: '#385A75', border: '2px solid rgba(255,255,255,0.25)' };
  }
  if (n.includes('carrara marble') || n.includes('marble')) {
    return {
      background: 'linear-gradient(135deg, #F0F2F5 0%, #D5D8DC 50%, #E2E5E8 100%)',
      border: '2px solid rgba(255,255,255,0.5)',
    };
  }
  if (n.includes('concrete')) {
    return { background: '#6E7377', border: '2px solid rgba(255,255,255,0.25)' };
  }
  if (n.includes('light oak') || n.includes('woodslat')) {
    return {
      background: 'linear-gradient(135deg, #C79A63 0%, #8F6531 100%)',
      border: '2px solid #D8AA73',
    };
  }
  if (n.includes('brown')) {
    return { background: '#4A3326', border: '2px solid rgba(255,255,255,0.25)' };
  }
  if (n.includes('clear') || n.includes('translucent')) {
    return {
      background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(200,220,240,0.3) 100%)',
      border: '2px solid rgba(255,255,255,0.4)',
    };
  }

  return { background: '#7A7F85', border: '2px solid rgba(255,255,255,0.25)' };
}
