export interface DeityOption {
  id: string;
  labelMarathi: string;
  labelHindi: string;
  labelEnglish: string;
  symbol: string;
  svgPath?: string;
}

export const deityOptions: DeityOption[] = [
  {
    id: 'ganesh',
    labelMarathi: 'श्री गणेश',
    labelHindi: 'श्री गणेश',
    labelEnglish: 'Shree Ganesh',
    symbol: '🕉️',
    svgPath: '/deities/ganesh.svg',
  },
  {
    id: 'laxmi',
    labelMarathi: 'श्री लक्ष्मी',
    labelHindi: 'श्री लक्ष्मी',
    labelEnglish: 'Shree Lakshmi',
    symbol: '🪔',
    svgPath: '/deities/laxmi.svg',
  },
  {
    id: 'saraswati',
    labelMarathi: 'श्री सरस्वती',
    labelHindi: 'श्री सरस्वती',
    labelEnglish: 'Shree Saraswati',
    symbol: '🎵',
    svgPath: '/deities/saraswati.svg',
  },
  {
    id: 'balaji',
    labelMarathi: 'श्री बालाजी',
    labelHindi: 'श्री बालाजी',
    labelEnglish: 'Shree Balaji',
    symbol: '🙏',
    svgPath: '/deities/balaji.svg',
  },
  {
    id: 'shiva',
    labelMarathi: 'श्री शंकर',
    labelHindi: 'श्री शंकर',
    labelEnglish: 'Shree Shiva',
    symbol: '🔱',
    svgPath: '/deities/shiva.svg',
  },
  {
    id: 'krishna',
    labelMarathi: 'श्री कृष्ण',
    labelHindi: 'श्री कृष्ण',
    labelEnglish: 'Shree Krishna',
    symbol: '🦚',
    svgPath: '/deities/krishna.svg',
  },
  {
    id: 'rama',
    labelMarathi: 'श्री राम',
    labelHindi: 'श्री राम',
    labelEnglish: 'Shree Ram',
    symbol: '🏹',
    svgPath: '/deities/rama.svg',
  },
  {
    id: 'none',
    labelMarathi: 'देवता नको',
    labelHindi: 'देवता नहीं',
    labelEnglish: 'None',
    symbol: '✕',
  },
];

export function getDeityLabel(
  deityId: string,
  language: 'marathi' | 'hindi' | 'english'
): string {
  const deity = deityOptions.find((d) => d.id === deityId);
  if (!deity) return '';
  switch (language) {
    case 'marathi':
      return deity.labelMarathi;
    case 'hindi':
      return deity.labelHindi;
    case 'english':
      return deity.labelEnglish;
    default:
      return deity.labelEnglish;
  }
}
