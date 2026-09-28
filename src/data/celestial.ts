export interface ConstellationInfo {
  name: string;
  latinName: string;
  season: string;
  element: 'Water' | 'Air' | 'Earth' | 'Fire' | 'Aether';
  symbol: string;
  symbolism: string;
  poeticNote: string;
  stars: Array<{ x: number; y: number; size: number; alpha?: number }>;
  connections: Array<[number, number]>;
}

export const CONSTELLATIONS: Record<string, ConstellationInfo> = {
  Orion: {
    name: 'Orion',
    latinName: 'The Celestial Hunter',
    season: 'Winter',
    element: 'Aether',
    symbol: '✦',
    symbolism: 'Unwavering guidance, the celestial belt, and resolute clarity across deep waters.',
    poeticNote: 'Three radiant stars align across cold midnight tides, guiding voyagers back to harbor.',
    stars: [
      { x: 30, y: 25, size: 2.8 }, // Betelgeuse
      { x: 70, y: 20, size: 2.4 }, // Bellatrix
      { x: 42, y: 50, size: 2.6 }, // Alnitak
      { x: 50, y: 51, size: 2.6 }, // Alnilam
      { x: 58, y: 52, size: 2.6 }, // Mintaka
      { x: 35, y: 80, size: 2.2 }, // Saiph
      { x: 75, y: 78, size: 3.2 }, // Rigel
      { x: 50, y: 15, size: 1.5 }, // Meissa
    ],
    connections: [
      [7, 0], [7, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]
    ]
  },
  Gemini: {
    name: 'Gemini',
    latinName: 'The Twin Stars',
    season: 'Spring',
    element: 'Air',
    symbol: '♊',
    symbolism: 'Duality in harmony, twin souls echoing across the silent celestial expanse.',
    poeticNote: 'Two stars that never part, mirroring one another as the sky turns upon the dark ocean.',
    stars: [
      { x: 35, y: 20, size: 3.0 }, // Castor
      { x: 65, y: 18, size: 3.2 }, // Pollux
      { x: 32, y: 48, size: 1.8 },
      { x: 68, y: 46, size: 1.8 },
      { x: 30, y: 75, size: 2.0 }, // Alhena
      { x: 70, y: 78, size: 2.0 },
    ],
    connections: [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [2, 3]
    ]
  },
  Leo: {
    name: 'Leo',
    latinName: 'The Celestial Lion',
    season: 'Spring',
    element: 'Fire',
    symbol: '♌',
    symbolism: 'Sovereign radiance, warmth reflected upon midnight waters, heartfelt courage.',
    poeticNote: 'A sickle of pure starlight crowning the apex of the night, untroubled by passing clouds.',
    stars: [
      { x: 75, y: 22, size: 2.2 },
      { x: 65, y: 15, size: 2.0 },
      { x: 50, y: 28, size: 2.6 },
      { x: 45, y: 45, size: 3.4 }, // Regulus
      { x: 25, y: 65, size: 2.5 }, // Denebola
      { x: 40, y: 70, size: 2.0 },
      { x: 62, y: 55, size: 2.2 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 6], [6, 5], [5, 4], [4, 3]
    ]
  },
  Pisces: {
    name: 'Pisces',
    latinName: 'The Tide Dwellers',
    season: 'Autumn',
    element: 'Water',
    symbol: '♓',
    symbolism: 'Submerged depths, infinite intuition, two currents united by an invisible cord of light.',
    poeticNote: 'Beneath the calm swell, two streams weave around the submerged reflections of the moon.',
    stars: [
      { x: 20, y: 25, size: 2.2 },
      { x: 35, y: 40, size: 1.8 },
      { x: 50, y: 75, size: 2.8 }, // Alrescha (the knot)
      { x: 70, y: 50, size: 2.0 },
      { x: 80, y: 30, size: 2.4 },
      { x: 25, y: 15, size: 1.8 },
      { x: 85, y: 20, size: 1.8 },
    ],
    connections: [
      [5, 0], [0, 1], [1, 2], [2, 3], [3, 4], [4, 6]
    ]
  },
  Cassiopeia: {
    name: 'Cassiopeia',
    latinName: 'The Queen of the North',
    season: 'Autumn',
    element: 'Aether',
    symbol: 'W',
    symbolism: 'Eternal elegance, diamond-cut perfection, unchanging presence over northern waters.',
    poeticNote: 'A celestial crown of five brilliant points tracing an eternal rhythm around the pole star.',
    stars: [
      { x: 18, y: 55, size: 2.6 }, // Caph
      { x: 35, y: 25, size: 3.0 }, // Schedar
      { x: 52, y: 50, size: 3.2 }, // Gamma Cas (Navi)
      { x: 70, y: 30, size: 2.4 }, // Ruchbah
      { x: 85, y: 52, size: 2.2 }, // Segin
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4]
    ]
  },
  Lyra: {
    name: 'Lyra',
    latinName: 'The Celestial Harp',
    season: 'Summer',
    element: 'Air',
    symbol: '✦',
    symbolism: 'Harmonics of the spheres, crystalline clarity, melodies whispered upon the evening breeze.',
    poeticNote: 'Vega shines with sapphiric brilliance, tuning the celestial tides to silent music.',
    stars: [
      { x: 50, y: 18, size: 3.6 }, // Vega
      { x: 38, y: 45, size: 2.0 },
      { x: 62, y: 45, size: 2.0 },
      { x: 42, y: 78, size: 2.4 }, // Sulafat
      { x: 58, y: 78, size: 2.4 }, // Sheliak
    ],
    connections: [
      [0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4]
    ]
  },
  Scorpio: {
    name: 'Scorpio',
    latinName: 'The Heart of Midnight',
    season: 'Summer',
    element: 'Water',
    symbol: '♏',
    symbolism: 'Profound mysteries, deep emotional currents, an ember glowing beneath black water.',
    poeticNote: 'Antares burns with quiet, brooding intensity, anchoring the river of the Milky Way.',
    stars: [
      { x: 25, y: 25, size: 2.0 },
      { x: 32, y: 35, size: 2.2 },
      { x: 42, y: 45, size: 3.5 }, // Antares
      { x: 48, y: 60, size: 2.0 },
      { x: 58, y: 75, size: 2.2 },
      { x: 72, y: 78, size: 2.4 }, // Shaula
      { x: 78, y: 65, size: 2.0 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]
    ]
  },
  Cancer: {
    name: 'Cancer',
    latinName: 'The Moon Sanctuary',
    season: 'Summer',
    element: 'Water',
    symbol: '♋',
    symbolism: 'Gentle sanctuary, pearl formation, maternal devotion and tidal memory.',
    poeticNote: 'The quiet guardian of the beehive cluster, holding light gently like ocean sea glass.',
    stars: [
      { x: 50, y: 45, size: 2.8 },
      { x: 30, y: 30, size: 2.0 },
      { x: 68, y: 32, size: 2.2 },
      { x: 52, y: 75, size: 2.4 },
    ],
    connections: [
      [0, 1], [0, 2], [0, 3]
    ]
  },
  Taurus: {
    name: 'Taurus',
    latinName: 'The Golden Horn',
    season: 'Autumn',
    element: 'Earth',
    symbol: '♉',
    symbolism: 'Enduring devotion, timeless grounding, precious gold forged under deep pressure.',
    poeticNote: 'Aldebaran watches over the Pleiades sisters, a steady lantern in winter storms.',
    stars: [
      { x: 30, y: 65, size: 3.4 }, // Aldebaran
      { x: 45, y: 55, size: 2.2 },
      { x: 60, y: 48, size: 2.0 },
      { x: 80, y: 25, size: 2.4 }, // Elnath
      { x: 75, y: 60, size: 2.2 },
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [2, 4]
    ]
  },
  Aquarius: {
    name: 'Aquarius',
    latinName: 'The Water Bearer',
    season: 'Winter',
    element: 'Air',
    symbol: '♒',
    symbolism: 'Celestial cascade, visionary insight, pouring fresh silver currents into mortal seas.',
    poeticNote: 'An endless stream of light falling through darkness, renewing the tides of the soul.',
    stars: [
      { x: 40, y: 20, size: 2.6 },
      { x: 55, y: 22, size: 2.4 },
      { x: 45, y: 45, size: 2.0 },
      { x: 35, y: 62, size: 2.2 },
      { x: 60, y: 68, size: 2.2 },
      { x: 75, y: 82, size: 2.4 },
    ],
    connections: [
      [0, 1], [0, 2], [2, 3], [2, 4], [4, 5]
    ]
  },
  Cygnus: {
    name: 'Cygnus',
    latinName: 'The Celestial Swan',
    season: 'Summer',
    element: 'Aether',
    symbol: '✦',
    symbolism: 'Graceful flight across the night, wings outstretched over silent waters.',
    poeticNote: 'Deneb anchors the Northern Cross, soaring upon silent thermals of diamond dust.',
    stars: [
      { x: 50, y: 20, size: 3.4 }, // Deneb
      { x: 50, y: 48, size: 2.8 }, // Sadr
      { x: 20, y: 52, size: 2.2 },
      { x: 80, y: 50, size: 2.2 },
      { x: 50, y: 82, size: 2.4 }, // Albireo
    ],
    connections: [
      [0, 1], [1, 4], [2, 1], [1, 3]
    ]
  },
  UrsaMajor: {
    name: 'Ursa Major',
    latinName: 'The Great Bear',
    season: 'Spring',
    element: 'Earth',
    symbol: '✧',
    symbolism: 'Eternal guidance, generational endurance, steady orientation through unmapped oceans.',
    poeticNote: 'Seven stars that have guided navigators across black seas since the first sail was raised.',
    stars: [
      { x: 18, y: 35, size: 2.4 }, // Alkaid
      { x: 32, y: 38, size: 2.4 }, // Mizar
      { x: 45, y: 45, size: 2.2 }, // Alioth
      { x: 58, y: 50, size: 2.2 }, // Megrez
      { x: 55, y: 72, size: 2.4 }, // Phecda
      { x: 78, y: 70, size: 2.8 }, // Merak
      { x: 82, y: 46, size: 3.0 }, // Dubhe
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]
    ]
  }
};

export const MOON_PHASES = [
  { name: 'New Moon', phaseVal: 0, symbolism: 'The seed of intention, quiet renewal, potential resting in deep stillness.' },
  { name: 'Waxing Crescent', phaseVal: 0.125, symbolism: 'Emergent illumination, gentle growth, a sliver of light upon dark water.' },
  { name: 'First Quarter', phaseVal: 0.25, symbolism: 'Balance of light and shadow, resolve, strength rising with the tide.' },
  { name: 'Waxing Gibbous', phaseVal: 0.375, symbolism: 'Culmination approaching, refined patience, luminous anticipation.' },
  { name: 'Full Moon', phaseVal: 0.5, symbolism: 'Peak radiance, unclouded clarity, high tide of emotional connection.' },
  { name: 'Waning Gibbous', phaseVal: 0.625, symbolism: 'Gratitude, shared wisdom, the serene reflection of completed journeys.' },
  { name: 'Third Quarter', phaseVal: 0.75, symbolism: 'Release and introspection, quiet discernment, water settling into peace.' },
  { name: 'Waning Crescent', phaseVal: 0.875, symbolism: 'Restorative quietude, surrender to natural rhythms, the silver hush before dawn.' },
];

/**
 * Calculates accurate astrological sign / primary constellation from birth date.
 */
export function getConstellationFromDate(dobString: string): string {
  if (!dobString) return 'Orion';
  const date = new Date(dobString);
  if (isNaN(date.getTime())) return 'Orion';
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Orion'; // Aries season maps to prominent Orion in Célune mythology
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Cassiopeia';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Lyra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Cygnus';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'UrsaMajor';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

/**
 * Calculates the astronomical lunar phase for a given date.
 */
export function getMoonPhaseFromDate(dobString: string): { name: string; phaseFraction: number; symbolism: string } {
  if (!dobString) return { ...MOON_PHASES[1], phaseFraction: MOON_PHASES[1].phaseVal };
  const date = new Date(dobString);
  if (isNaN(date.getTime())) return { ...MOON_PHASES[1], phaseFraction: MOON_PHASES[1].phaseVal };

  // Synodic lunar month calculation relative to known reference new moon (Jan 11, 2000, 18:14 UTC)
  const refTime = new Date('2000-01-11T18:14:00Z').getTime();
  const diffDays = (date.getTime() - refTime) / (1000 * 60 * 60 * 24);
  const lunarCycle = 29.53058867;
  let phaseFraction = (diffDays % lunarCycle) / lunarCycle;
  if (phaseFraction < 0) phaseFraction += 1;

  if (phaseFraction < 0.06 || phaseFraction >= 0.94) return { ...MOON_PHASES[0], phaseFraction };
  if (phaseFraction < 0.19) return { ...MOON_PHASES[1], phaseFraction };
  if (phaseFraction < 0.31) return { ...MOON_PHASES[2], phaseFraction };
  if (phaseFraction < 0.44) return { ...MOON_PHASES[3], phaseFraction };
  if (phaseFraction < 0.56) return { ...MOON_PHASES[4], phaseFraction };
  if (phaseFraction < 0.69) return { ...MOON_PHASES[5], phaseFraction };
  if (phaseFraction < 0.81) return { ...MOON_PHASES[6], phaseFraction };
  return { ...MOON_PHASES[7], phaseFraction };
}

/**
 * Poetic generator for "Two Skies, One Moon" experience.
 */
export function generateSharedSkyNarrative(
  person1Name: string,
  const1: string,
  person2Name: string,
  const2: string,
  sharedMoon: string
): string {
  const p1 = person1Name.trim() || 'One';
  const p2 = person2Name.trim() || 'Another';
  const info1 = CONSTELLATIONS[const1] || CONSTELLATIONS['Orion'];
  const info2 = CONSTELLATIONS[const2] || CONSTELLATIONS['Gemini'];

  return `Beneath the silver canopy of the ${sharedMoon}, the sky traces an unbroken arc between ${p1}'s constellation of ${info1.name} and ${p2}'s constellation of ${info2.name}. As ocean tides rise to greet the nocturnal zenith, their celestial patterns do not compete; they echo. One carries the quiet resonance of ${info1.element.toLowerCase()} while the other anchors the clarity of ${info2.element.toLowerCase()}, joined at the center by the constant presence of the moon they share.`;
}
