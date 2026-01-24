'use client';

const products = [
  { size: '4 oz', type: 'Espresso', top: '62 mm', height: '60 mm', vol: '110 ml' },
  { size: '8 oz', type: 'Standard', top: '80 mm', height: '90 mm', vol: '220 ml' },
  { size: '12 oz', type: 'Large', top: '90 mm', height: '110 mm', vol: '360 ml' },
  { size: '16 oz', type: 'Bowl (New)', top: '114 mm', height: '72 mm', vol: '440 ml', highlight: true },
];

export default function ModelsSection() {
  return (
    <section id="models" className="bg-black py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 md:mb-12">
          <div>
            <span className="text-green-500 font-mono text-xs tracking-widest mb-2 block">TECHNICAL SPECS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-bold text-white">AVAILABLE MODELS</h2>
          </div>
          <button className="border border-white/20 text-white px-4 md:px-6 py-2 text-xs font-mono hover:bg-white hover:text-black transition-colors whitespace-nowrap">
            DOWNLOAD CATALOG ↓
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[500px] sm:min-w-0 px-4 sm:px-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20 text-gray-500 font-mono text-[10px] sm:text-xs tracking-wider">
                  <th className="py-3 md:py-4 pl-4">SIZE</th>
                  <th className="py-3 md:py-4">TYPE</th>
                  <th className="py-3 md:py-4 hidden sm:table-cell">TOP DIA</th>
                  <th className="py-3 md:py-4 hidden sm:table-cell">HEIGHT</th>
                  <th className="py-3 md:py-4 text-right pr-4">VOLUME</th>
                </tr>
              </thead>
              <tbody className="font-oswald">
                {products.map((item, idx) => (
                  <tr key={idx} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${item.highlight ? 'bg-green-900/10' : ''}`}>
                    <td className="py-4 md:py-6 pl-4 text-lg sm:text-xl md:text-2xl text-white font-bold">{item.size}</td>
                    <td className="py-4 md:py-6 text-gray-400 text-sm sm:text-base">{item.type}</td>
                    <td className="py-4 md:py-6 text-gray-400 hidden sm:table-cell">{item.top}</td>
                    <td className="py-4 md:py-6 text-gray-400 hidden sm:table-cell">{item.height}</td>
                    <td className="py-4 md:py-6 text-right pr-4 text-green-400 text-sm sm:text-base">{item.vol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
