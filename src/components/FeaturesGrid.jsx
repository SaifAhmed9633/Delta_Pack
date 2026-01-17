'use client';
import { motion } from 'framer-motion';

const features = [
  {
    id: '01',
    title: "PREMIUM PAPER",
    desc: "ورق أوروبي عالي الكثافة (320gsm) معتمد من PEFC، يضمن متانة استثنائية وعدم تسريب للسوائل الساخنة.",
  },
  {
    id: '02',
    title: "HIGH-DEF PRINTING",
    desc: "طباعة أوفست فليكسو بدقة 6 ألوان. نظهر أدق تفاصيل شعارك بوضوح تام وكأنها صورة فوتوغرافية.",
  },
  {
    id: '03',
    title: "FOOD SAFETY",
    desc: "خامات صحية 100% (Food Grade) خالية من الروائح والمواد الضارة، مطابقة لمواصفات هيئة سلامة الغذاء.",
  },
  {
    id: '04',
    title: "FAST PRODUCTION",
    desc: "خطوط إنتاج ألمانية تعمل 24/7. نضمن تسليم الطلبات الكبيرة في مواعيد قياسية.",
  }
];

export default function FeaturesGrid() {
  return (
    <section className="bg-[#050505] py-24 px-6 md:px-20 relative overflow-hidden">
      
      {/* خلفية شبكية خفيفة */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* العنوان */}
        <div className="mb-16 border-l-4 border-green-500 pl-6">
          <h2 className="text-4xl md:text-6xl font-oswald font-bold text-white mb-2">
            WHY DELTA PACK®?
          </h2>
          <p className="text-gray-400 max-w-xl">
            نحن لا نصنع مجرد أكواب، نحن نصنع واجهة علامتك التجارية.
          </p>
        </div>

        {/* الشبكة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#080808] p-10 group hover:bg-[#0a0a0a] transition-colors relative"
            >
              {/* رقم الميزة */}
              <span className="absolute top-6 right-6 text-4xl font-oswald font-bold text-white/5 group-hover:text-green-500/10 transition-colors">
                {feature.id}
              </span>

              <h3 className="text-xl font-oswald font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed border-l border-white/10 pl-4 group-hover:border-green-500/50 transition-colors">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}