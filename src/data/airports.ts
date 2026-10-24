// [longitude, latitude] for every airport that appears in flights.json.
// Used to project points onto the isometric world map.
export const airportCoords: Record<string, [number, number]> = {
  AEP: [-58.415, -34.559], // Buenos Aires
  AMS: [4.764, 52.309], // Amsterdam
  AUH: [54.651, 24.433], // Abu Dhabi
  AXT: [140.219, 39.616], // Akita
  BKK: [100.747, 13.69], // Bangkok
  BLR: [77.706, 13.199], // Bengaluru
  CCU: [88.447, 22.655], // Kolkata
  CDG: [2.548, 49.01], // Paris
  CMB: [79.884, 7.181], // Colombo
  CNX: [98.963, 18.767], // Chiang Mai
  DEL: [77.103, 28.556], // New Delhi
  DXB: [55.364, 25.253], // Dubai
  GOI: [73.831, 15.381], // Goa
  HKT: [98.317, 8.113], // Phuket
  HND: [139.781, 35.552], // Tokyo (Haneda)
  HYD: [78.429, 17.24], // Hyderabad
  IXL: [77.547, 34.136], // Leh
  JAI: [75.812, 26.824], // Jaipur
  KUL: [101.71, 2.746], // Kuala Lumpur
  LHR: [-0.454, 51.47], // London
  LIM: [-77.114, -12.022], // Lima
  LIS: [-9.135, 38.774], // Lisbon
  MAA: [80.169, 12.99], // Chennai
  MAD: [-3.567, 40.472], // Madrid
  NCE: [7.215, 43.658], // Nice
  NRT: [140.386, 35.765], // Tokyo (Narita)
  SIN: [103.994, 1.359], // Singapore
  SYD: [151.177, -33.946], // Sydney
  TPE: [121.233, 25.077], // Taipei
  UKB: [135.224, 34.633], // Osaka / Kobe
  VIE: [16.57, 48.11], // Vienna
}

// Equirectangular projection onto the map plane laid on XZ (Y is up).
// Map spans x:[-MAP_W/2, MAP_W/2], z:[-MAP_H/2, MAP_H/2], 2:1 aspect.
export const MAP_W = 20
export const MAP_H = 10

export function project(lng: number, lat: number): [number, number] {
  const x = (lng / 180) * (MAP_W / 2)
  const z = -(lat / 90) * (MAP_H / 2)
  return [x, z]
}

// ISO country code for every airport above — drives the hover morph.
export const airportCountry: Record<string, string> = {
  AEP: 'AR',
  AMS: 'NL',
  AUH: 'AE',
  AXT: 'JP',
  BKK: 'TH',
  BLR: 'IN',
  CCU: 'IN',
  CDG: 'FR',
  CMB: 'LK',
  CNX: 'TH',
  DEL: 'IN',
  DXB: 'AE',
  GOI: 'IN',
  HKT: 'TH',
  HND: 'JP',
  HYD: 'IN',
  IXL: 'IN',
  JAI: 'IN',
  KUL: 'MY',
  LHR: 'GB',
  LIM: 'PE',
  LIS: 'PT',
  MAA: 'IN',
  MAD: 'ES',
  NCE: 'FR',
  NRT: 'JP',
  SIN: 'SG',
  SYD: 'AU',
  TPE: 'TW',
  UKB: 'JP',
  VIE: 'AT',
}

// What the dot matrix turns into when you hover a country's airport. Picked
// for a recognisable solid silhouette, since the dots are plain white.
export const countryIcons: Record<
  string,
  { name: string; emoji: string; thing: string }
> = {
  AE: { name: 'United Arab Emirates', emoji: '🐪', thing: 'camel' },
  AR: { name: 'Argentina', emoji: '🐎', thing: 'gaucho horse' },
  AT: { name: 'Austria', emoji: '🎻', thing: 'violin' },
  AU: { name: 'Australia', emoji: '🦘', thing: 'kangaroo' },
  ES: { name: 'Spain', emoji: '🐂', thing: 'toro' },
  FR: { name: 'France', emoji: '🗼', thing: 'eiffel tower' },
  GB: { name: 'United Kingdom', emoji: '👑', thing: 'the crown' },
  IN: { name: 'India', emoji: '🏏', thing: 'cricket' },
  JP: { name: 'Japan', emoji: '⛩️', thing: 'torii gate' },
  LK: { name: 'Sri Lanka', emoji: '🫖', thing: 'ceylon tea' },
  MY: { name: 'Malaysia', emoji: '🐅', thing: 'malayan tiger' },
  NL: { name: 'Netherlands', emoji: '🌷', thing: 'tulip' },
  PE: { name: 'Peru', emoji: '🦙', thing: 'llama' },
  PT: { name: 'Portugal', emoji: '🐓', thing: 'barcelos rooster' },
  SG: { name: 'Singapore', emoji: '🦀', thing: 'chilli crab' },
  TH: { name: 'Thailand', emoji: '🐘', thing: 'elephant' },
  TW: { name: 'Taiwan', emoji: '🛵', thing: 'scooter city' },
}
