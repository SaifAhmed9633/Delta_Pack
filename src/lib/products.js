// Product catalog used by the Hero Showcase + Cart
// Colors are used to retint the 3D cup with smooth transitions between products.
export const products = [
  {
    id: 'arctic-16',
    name: 'ARCTIC',
    tagline: 'PAPER CUP',
    price: 12.0,
    currency: 'USD',
    bodyColor: '#f4f9ff',
    rimColor: '#dbeafe',
    accent: '#38bdf8',
    description:
      'Double-walled insulated cup. Crisp arctic white finish with a ceramic-smooth feel.',
    specs: {
      type: '16oz CUP',
      topDia: '90 MM',
      height: '135 MM',
      volume: '473 ML',
      weight: '14 G',
      material: 'FSC PAPER + PLA',
    },
  },
  {
    id: 'ember-16',
    name: 'EMBER',
    tagline: 'MATTE BLACK',
    price: 14.0,
    currency: 'USD',
    bodyColor: '#141414',
    rimColor: '#2a2a2a',
    accent: '#f97316',
    description:
      'Signature matte black series. Soft-touch coating with a copper-orange interior rim.',
    specs: {
      type: '16oz CUP',
      topDia: '90 MM',
      height: '135 MM',
      volume: '473 ML',
      weight: '15 G',
      material: 'FSC PAPER + PE',
    },
  },
  {
    id: 'forest-12',
    name: 'FOREST',
    tagline: 'ECO LINE',
    price: 10.0,
    currency: 'USD',
    bodyColor: '#0f3d2e',
    rimColor: '#16523d',
    accent: '#22c55e',
    description:
      'Compostable eco line. Plant-based bio coating, FSC-certified paper.',
    specs: {
      type: '12oz CUP',
      topDia: '80 MM',
      height: '110 MM',
      volume: '355 ML',
      weight: '12 G',
      material: 'FSC PAPER + PLA',
    },
  },
  {
    id: 'kraft-8',
    name: 'KRAFT',
    tagline: 'NATURAL',
    price: 9.0,
    currency: 'USD',
    bodyColor: '#b08968',
    rimColor: '#8c6a4f',
    accent: '#fbbf24',
    description:
      'Unbleached natural kraft paper. Authentic raw texture for artisan brands.',
    specs: {
      type: '8oz CUP',
      topDia: '75 MM',
      height: '92 MM',
      volume: '236 ML',
      weight: '10 G',
      material: 'KRAFT PAPER + PE',
    },
  },
];

export const formatPrice = (price, currency = 'USD') => {
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency;
  return `${symbol}${price.toFixed(2)}`;
};
