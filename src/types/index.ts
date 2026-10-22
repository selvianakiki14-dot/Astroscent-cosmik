export type ZodiacSignName =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type ElementType = 'Fire' | 'Earth' | 'Air' | 'Water';

export type PlanetName =
  | 'Sun'
  | 'Moon'
  | 'Mars'
  | 'Mercury'
  | 'Jupiter'
  | 'Venus'
  | 'Saturn'
  | 'Rahu'
  | 'Ketu';

export interface ZodiacSignInfo {
  name: ZodiacSignName;
  symbol: string;
  element: ElementType;
  rulingPlanet: PlanetName;
  dateRange: string;
  trait: string;
  signatureAccord: string;
}

export interface OlfactoryPyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface CosmicPerfume {
  id: string;
  name: string;
  planet: PlanetName;
  symbol: string;
  element: ElementType;
  tagline: string;
  description: string;
  pyramid: OlfactoryPyramid;
  dominantAccords: string[];
  sillage: 'Intimate' | 'Moderate' | 'Enveloping' | 'Celestial Projection';
  longevity: '8-10 Hours' | '10-12 Hours' | '12+ Hours';
  price: number;
  image: string;
  mantra: string;
  astrologicalResonance: string;
  recommendedZodiac: ZodiacSignName[];
}

export interface BirthChartResult {
  fullName: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  sunSign: ZodiacSignInfo;
  moonSign: ZodiacSignInfo;
  risingSign: ZodiacSignInfo;
  rulingPlanet: PlanetName;
  elementalBalance: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  recommendedPerfume: CosmicPerfume;
  bespokeFormula: {
    topNote: string;
    heartNote: string;
    baseNote: string;
    auraVibe: string;
    applicationRitual: string;
  };
}

export interface CartItem {
  id: string;
  perfume: CosmicPerfume;
  size: '50ml Eau de Parfum' | '100ml Extrait de Parfum' | '10ml Travel Talisman';
  price: number;
  quantity: number;
  engraving?: string;
  flaconStyle?: string;
  capStyle?: string;
}
