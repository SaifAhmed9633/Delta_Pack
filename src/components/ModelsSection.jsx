'use client';
import { motion } from 'framer-motion';

const products = [
  { size: '4 oz', type: 'Espresso', top: '62 mm', height: '60 mm', vol: '110 ml' },
  { size: '8 oz', type: 'Standard', top: '80 mm', height: '90 mm', vol: '220 ml' },
  { size: '12 oz', type: 'Large', top: '90 mm', height: '110 mm', vol: '360 ml' },
  { size: '16 oz', type: 'Bowl', top: '114 mm', height: '72 mm', vol: '440 ml', highlight: true },
];

export default function ModelsSection() {
  return (
    <section id="models" className="bg-black py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-white/10 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-900/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 md:mb-12">
          <div>
            <span className="text-green-500 font-mono text-xs tracking-widest mb-2 block">TECHNICAL SPECS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-bold text-white">AVAILABLE MODELS</h2>
          </div>
          <a href="#contact" className="border border-white/20 text-white px-4 md:px-6 py-2 text-xs font-mono hover:bg-white hover:text-black transition-colors whitespace-nowrap">
            DOWNLOAD CATALOG ↓
          </a>
        </motion.div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[500px] sm:min-w-0 px-4 sm:px-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-600 font-mono text-[10px] sm:text-xs tracking-widest">
                  <th className="py-3 md:py-4 pl-4">SIZE</th>
                  <th className="py-3 md:py-4">TYPE</th>
                  <th className="py-3 md:py-4 hidden sm:table-cell">TOP DIA</th>
                  <th className="py-3 md:py-4 hidden sm:table-cell">HEIGHT</th>
                  <th className="py-3 md:py-4 text-right pr-4">VOLUME</th>
                </tr>
              </thead>
              <tbody className="font-oswald">
                {products.map((item, idx) => (
                  <motion.tr key={idx} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }} viewport={{ once: true }}
                    className={`border-b transition-colors duration-200 ${item.highlight ? 'border-green-500/20 bg-green-900/10 hover:bg-green-900/20' : 'border-white/5 hover:bg-white/[0.03]'}`}>
                    <td className="py-4 md:py-6 pl-4"><span className="text-lg sm:text-xl md:text-2xl text-white font-bold">{item.size}</span></td>
                    <td className="py-4 md:py-6">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm sm:text-base">{item.type}</span>
                        {item.highlight && <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider bg-green-500 text-black">NEW</span>}
                      </div>
                    </td>
                    <td className="py-4 md:py-6 text-gray-400 hidden sm:table-cell">{item.top}</td>
                    <td className="py-4 md:py-6 text-gray-400 hidden sm:table-cell">{item.height}</td>
                    <td className={`py-4 md:py-6 text-right pr-4 text-sm sm:text-base font-bold ${item.highlight ? 'text-green-400' : 'text-gray-400'}`}>{item.vol}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} viewport={{ once: true }}
          className="mt-6 text-[10px] font-mono text-gray-600 tracking-widest">
          * CUSTOM SIZES AVAILABLE ON REQUEST · ALL SPECS PER ISO 9001 STANDARDS
        </motion.p>
      </div>
    </section>
  );
}
