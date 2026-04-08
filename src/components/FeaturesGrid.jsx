'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSectionCup } from '@/lib/cupContext';

const features = [
  {
    id: '01',
    title: 'PREMIUM PAPER',
    desc: 'ورق أوروبي عالي الكثافة (320gsm) معتمد من PEFC، يضمن متانة استثنائية وعدم تسريب للسوائل الساخنة.',
    accent: '#22c55e',
    stat: '320 GSM',
    statLabel: 'DENSITY',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'HIGH-DEF PRINTING',
    desc: 'طباعة أوفست فليكسو بدقة 6 ألوان. نُظهر أدق تفاصيل شعارك بوضوح تام وكأنها صورة فوتوغرافية.',
    accent: '#38bdf8',
    stat: '6 COLOR',
    statLabel: 'OFFSET PRINT',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'FOOD SAFETY',
    desc: 'خامات صحية 100% (Food Grade) خالية من الروائح والمواد الضارة، مطابقة لمواصفات هيئة سلامة الغذاء.',
    accent: '#f97316',
    stat: 'ISO 22000',
    statLabel: 'CERTIFIED',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'FAST PRODUCTION',
    desc: 'خطوط إنتاج ألمانية تعمل 24/7. نضمن تسليم الطلبات الكبيرة في مواعيد قياسية.',
    accent: '#a855f7',
    stat: '24/7',
    statLabel: 'PRODUCTION',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function FeaturesGrid() {
  const sectionRef = useRef(null);
  useSectionCup('features', sectionRef);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative bg-[#050505] py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background accent glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-green-500/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-green-400" />
              <span className="text-[10px] font-mono text-green-400 tracking-[0.35em]">OUR ADVANTAGES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-oswald font-bold text-white leading-[0.9]">
              WHY<br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}
              >
                DELTA
              </span>{' '}
              PACK<span className="text-green-400">?</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-gray-500 text-sm leading-relaxed">
              نحن لا نصنع مجرد أكواب —<br />نصنع واجهة علامتك التجارية.
            </p>
            <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-gray-600 tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              EST. 2010 · 10TH OF RAMADAN, EGYPT
            </div>
          </div>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.id}
              variants={cardVariants}
              className="group relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-8 md:p-10 overflow-hidden cursor-default hover:border-white/[0.14] transition-all duration-500"
            >
              {/* Hover glow fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 20% 20%, ${f.accent}12, transparent 60%)`,
                }}
              />

              {/* Corner accent line */}
              <div
                className="absolute top-0 left-0 w-12 h-px opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-24"
                style={{ background: f.accent }}
              />
              <div
                className="absolute top-0 left-0 h-12 w-px opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:h-24"
                style={{ background: f.accent }}
              />

              {/* Header row */}
              <div className="flex items-start justify-between mb-8">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300"
                  style={{
                    background: `${f.accent}18`,
                    borderColor: `${f.accent}30`,
                    color: f.accent,
                  }}
                >
                  {f.icon}
                </div>

                {/* Stat badge */}
                <div className="text-right">
                  <div
                    className="font-oswald text-2xl font-bold leading-none"
                    style={{ color: f.accent }}
                  >
                    {f.stat}
                  </div>
                  <div className="text-[9px] font-mono text-gray-600 tracking-[0.2em] mt-0.5">
                    {f.statLabel}
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="text-[11px] font-mono text-gray-600 tracking-[0.2em] mb-2">{f.id}</div>
              <h3 className="font-oswald text-xl font-bold text-white mb-3 tracking-wide group-hover:text-white transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                {f.desc}
              </p>

              {/* Bottom progress line */}
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700 rounded-full"
                style={{ background: `linear-gradient(to right, ${f.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] border border-white/[0.05] rounded-2xl overflow-hidden"
        >
          {[
            { value: '15+', label: 'YEARS EXP.' },
            { value: '500M+', label: 'CUPS MADE' },
            { value: '1200+', label: 'CLIENTS' },
            { value: '24H', label: 'TURNAROUND' },
          ].map((s) => (
            <div key={s.label} className="bg-[#080808] hover:bg-[#0d0d0d] transition-colors px-6 py-7 text-center">
              <div className="font-oswald text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-[9px] font-mono text-gray-600 tracking-[0.25em]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
