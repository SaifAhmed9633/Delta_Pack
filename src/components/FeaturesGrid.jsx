'use client';
import { motion } from 'framer-motion';

const features = [
  {
    id: '01',
    title: "PREMIUM PAPER",
    desc: "ورق أوروبي عالي الكثافة (320gsm) معتمد من PEFC، يضمن متانة استثنائية وعدم تسريب للسوائل الساخنة.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    id: '02',
    title: "HIGH-DEF PRINTING",
    desc: "طباعة أوفست فليكسو بدقة 6 ألوان. نظهر أدق تفاصيل شعارك بوضوح تام وكأنها صورة فوتوغرافية.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
  },
  {
    id: '03',
    title: "FOOD SAFETY",
    desc: "خامات صحية 100% (Food Grade) خالية من الروائح والمواد الضارة، مطابقة لمواصفات هيئة سلامة الغذاء.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: '04',
    title: "FAST PRODUCTION",
    desc: "خطوط إنتاج ألمانية تعمل 24/7. نضمن تسليم الطلبات الكبيرة في مواعيد قياسية.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  }
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="bg-[#050505] py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
          className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="border-l-4 border-green-500 pl-4 md:pl-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-oswald font-bold text-white mb-2">WHY DELTA PACK®?</h2>
            <p className="text-gray-400 max-w-xl text-sm md:text-base">نحن لا نصنع مجرد أكواب، نحن نصنع واجهة علامتك التجارية.</p>
          </div>
          <span className="font-mono text-[10px] text-gray-600 tracking-widest hidden md:block">EST. 2010 · EGYPT</span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.07] border border-white/[0.07]">
          {features.map((feature, index) => (
            <motion.div key={feature.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }} viewport={{ once: true }}
              className="bg-[#080808] p-6 sm:p-8 md:p-10 group hover:bg-[#0c0c0c] transition-all duration-300 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/0 group-hover:bg-green-500/5 rounded-full blur-2xl transition-all duration-500" />
              <div className="flex items-start justify-between mb-5 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500/20 group-hover:border-green-500/40 transition-all duration-300">
                  {feature.icon}
                </div>
                <span className="text-3xl md:text-4xl font-oswald font-bold text-white/[0.04] group-hover:text-green-500/[0.08] transition-colors select-none">{feature.id}</span>
              </div>
              <h3 className="text-base md:text-lg font-oswald font-bold text-white mb-3 group-hover:text-green-400 transition-colors tracking-wide">{feature.title}</h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed border-l border-white/[0.08] pl-3 md:pl-4 group-hover:border-green-500/40 group-hover:text-gray-400 transition-all duration-300">{feature.desc}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-green-500/50 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
