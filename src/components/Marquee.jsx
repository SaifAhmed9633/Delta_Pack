'use client';

const ITEMS = [
  { text: 'PREMIUM QUALITY', color: '#22c55e' },
  { text: 'FDA APPROVED', color: '#38bdf8' },
  { text: 'CUSTOM PRINTING', color: '#a855f7' },
  { text: 'ECO FRIENDLY', color: '#22c55e' },
  { text: 'ISO 9001', color: '#f97316' },
  { text: 'GERMAN TECHNOLOGY', color: '#38bdf8' },
  { text: 'FAST DELIVERY', color: '#fbbf24' },
  { text: 'FOOD GRADE', color: '#22c55e' },
];

const Dot = ({ color }) => (
  <span
    className="inline-block w-1.5 h-1.5 rounded-full mx-8 md:mx-14 shrink-0 self-center"
    style={{ background: color, boxShadow: `0 0 8px ${color}` }}
  />
);

const Strip = () => (
  <div className="flex items-center shrink-0">
    {ITEMS.map((item, i) => (
      <span key={i} className="flex items-center">
        <span
          className="font-oswald text-2xl md:text-4xl font-bold tracking-tight uppercase select-none whitespace-nowrap"
          style={{ color: 'rgba(255,255,255,0.07)' }}
        >
          {item.text}
        </span>
        <Dot color={item.color} />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div className="w-full py-5 overflow-hidden relative bg-black/40 backdrop-blur-sm">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Top & bottom micro-lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.04]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.04]" />

      <div className="flex whitespace-nowrap" aria-hidden="true">
        <div className="flex animate-marquee">
          <Strip />
          <Strip />
        </div>
      </div>
    </div>
  );
}
