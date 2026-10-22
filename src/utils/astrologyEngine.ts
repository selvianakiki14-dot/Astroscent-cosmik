import { COSMIC_PERFUMES, ZODIAC_SIGNS } from '../data/cosmicPerfumes';
import { BirthChartResult, ZodiacSignInfo, ZodiacSignName } from '../types';

export function calculateBirthChart(
  fullName: string,
  birthDateStr: string,
  birthTimeStr: string,
  birthLocation: string
): BirthChartResult {
  const date = new Date(birthDateStr);
  const month = date.getUTCMonth() + 1; // 1-12
  const day = date.getUTCDate();

  // 1. Calculate Sun Sign based on Month and Day
  const sunSignName = getSunSign(month, day);
  const sunSign = ZODIAC_SIGNS[sunSignName];

  // 2. Approximate Moon Sign based on day cycle offset
  const zodiacList: ZodiacSignName[] = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces',
  ];

  const dayOfYear = getDayOfYear(date);
  const moonIndex = Math.floor((dayOfYear * 13.368) / 365) % 12;
  const moonSign = ZODIAC_SIGNS[zodiacList[moonIndex]];

  // 3. Approximate Ascendant (Rising Sign) based on Birth Time
  let hour = 12;
  let minute = 0;
  if (birthTimeStr) {
    const parts = birthTimeStr.split(':');
    hour = parseInt(parts[0], 10) || 12;
    minute = parseInt(parts[1], 10) || 0;
  }
  const timeOffset = hour + minute / 60;
  const sunSignIndex = zodiacList.indexOf(sunSignName);
  // Ascendant advances approximately 1 sign every 2 hours after sunrise (approx 6am)
  const signsAfterSun = Math.floor(((timeOffset + 24 - 6) % 24) / 2);
  const risingIndex = (sunSignIndex + signsAfterSun) % 12;
  const risingSign = ZODIAC_SIGNS[zodiacList[risingIndex]];

  // 4. Ruling Planet (derived from Rising Sign & Sun Sign)
  const rulingPlanet = risingSign.rulingPlanet;

  // 5. Elemental Balance
  const signs = [sunSign, moonSign, risingSign];
  let fireCount = 0;
  let earthCount = 0;
  let airCount = 0;
  let waterCount = 0;

  signs.forEach((s) => {
    if (s.element === 'Fire') fireCount++;
    if (s.element === 'Earth') earthCount++;
    if (s.element === 'Air') airCount++;
    if (s.element === 'Water') waterCount++;
  });

  const total = signs.length;
  const elementalBalance = {
    fire: Math.round((fireCount / total) * 100),
    earth: Math.round((earthCount / total) * 100),
    air: Math.round((airCount / total) * 100),
    water: Math.round((waterCount / total) * 100),
  };

  // 6. Recommended Cosmic Perfume
  let matchedPerfume = COSMIC_PERFUMES.find((p) => p.planet === rulingPlanet);
  if (!matchedPerfume) {
    matchedPerfume = COSMIC_PERFUMES.find((p) => p.recommendedZodiac.includes(sunSignName)) || COSMIC_PERFUMES[0];
  }

  // 7. Bespoke Formula Extraction
  const bespokeFormula = {
    topNote: `${sunSign.signatureAccord.split(',')[0]} (Sun: Core Vitality)`,
    heartNote: `${moonSign.signatureAccord.split('&')[0]} (Moon: Emotional Sanctuary)`,
    baseNote: `${risingSign.signatureAccord.split(',').slice(-1)[0]} (Ascendant: Outer Radiance)`,
    auraVibe: `Alchemized for ${sunSign.name} Sun with ${risingSign.name} Rising, governed by the celestial vibration of ${rulingPlanet}.`,
    applicationRitual: `Anoint upon your pulse points (wrists, carotid pulse, and collarbones) during the planetary hour of ${rulingPlanet} at sunrise or dusk while reciting '${matchedPerfume.mantra}'.`,
  };

  return {
    fullName: fullName || 'Celestial Traveler',
    birthDate: birthDateStr,
    birthTime: birthTimeStr,
    birthLocation: birthLocation || 'Cosmic Origin',
    sunSign,
    moonSign,
    risingSign,
    rulingPlanet,
    elementalBalance,
    recommendedPerfume: matchedPerfume,
    bespokeFormula,
  };
}

function getDayOfYear(date: Date): number {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getSunSign(month: number, day: number): ZodiacSignName {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}
