'use client';

const ITEMS = [
  "PREMIUM QUALITY", "FDA APPROVED", "CUSTOM PRINTING",
  "ECO FRIENDLY", "ISO 9001", "GERMAN TECHNOLOGY",
];

const Separator = () => (
  <span className="text-green-500/40 font-bold select-none mx-10 md:mx-16">✦</span>
);

const Strip = () => (
  <div className="flex items-center shrink-0">
    {ITEMS.map((item, index) => (
      <span key={index} className="flex items-center">
        <span className="font-oswald text-3xl md:text-5xl font-bold tracking-tight text-white/10 uppercase select-none">
          {item}
        </span>
        <Separator />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div className="w-full py-6 overflow-hidden relative z-10 border-y border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none" />
      <div className="flex whitespace-nowrap" style={{ willChange: 'transform' }}>
        <div className="flex animate-marquee">
          <Strip />
          <Strip aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
