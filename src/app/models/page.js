'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const CupShowcase = dynamic(() => import('@/components/CupShowcase'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="w-8 h-8 border-2 border-green-500/50 border-t-green-500 rounded-full animate-spin"></div>
    </div>
  )
});

export default function ModelsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) setProducts(data.data);
      } catch (error) { console.error("Failed to fetch:", error); }
      finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  const types = ['all', ...new Set(products.map(p => p.type))];
  const filteredProducts = filter === 'all' ? products : products.filter(p => p.type === filter);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#111] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 mb-6 border border-green-900/50 bg-green-900/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
              <span className="text-[10px] font-mono text-green-400 tracking-widest">PORTFOLIO</span>
            </div>
            <h1 className="font-oswald text-5xl md:text-8xl font-bold leading-[0.9] tracking-tight mb-6">
              OUR <br />
              <span className="stroke-text opacity-40" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)', color: 'transparent' }}>PROJECTS</span>
            </h1>
            <p className="text-gray-400 max-w-lg text-sm leading-relaxed border-l-2 border-green-500/50 pl-4">
              Explore our collection of custom paper cup designs. Each piece crafted with precision for our valued clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {types.map(type => (
              <button key={type} onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${filter === type ? 'bg-green-500 text-black font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'}`}>
                {type === 'all' ? 'ALL' : type}
              </button>
            ))}
          </div>
          <div className="text-xs font-mono text-gray-500">{filteredProducts.length} ITEMS</div>
        </div>
      </div>

      {/* Gallery */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.4 }}
                onClick={() => setSelectedProject(item)} className="group cursor-pointer">
                <div className="relative aspect-[4/5] bg-[#111] rounded-xl overflow-hidden border border-white/5 hover:border-green-500/30 transition-all duration-300">
                  <img src={item.img || '/design.jpg'} alt={item.client} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono text-green-400 tracking-wider">{item.type}</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-white font-oswald text-2xl font-bold uppercase mb-1 group-hover:text-green-400 transition-colors">{item.client}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.description}</p>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500">
                      <span>{item.specs?.height * 10}mm</span><span>•</span><span>⌀{item.specs?.top * 20}mm</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20"><p className="text-gray-500 font-mono text-sm">NO PROJECTS FOUND</p></div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 overflow-auto">
            <button onClick={() => setSelectedProject(null)} className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors border border-white/10">✕</button>
            <div className="min-h-screen flex flex-col lg:flex-row">
              <div className="flex-1 h-[50vh] lg:h-screen lg:sticky lg:top-0 relative bg-[#050505]">
                <CupShowcase config={selectedProject.specs} texturePath={selectedProject.img} />
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-400/70 text-xs font-mono">LIVE 3D · Drag to rotate</span>
                </div>
              </div>
              <div className="w-full lg:w-[480px] bg-[#0a0a0a] border-l border-white/5 p-8 lg:p-12">
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <div className="inline-flex items-center gap-2 mb-4 border border-green-900/50 bg-green-900/10 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span className="text-[10px] font-mono text-green-400 tracking-widest">{selectedProject.type}</span>
                  </div>
                  <h2 className="font-oswald text-4xl lg:text-5xl font-bold uppercase mb-6">{selectedProject.client}</h2>
                  <p className="text-gray-400 leading-relaxed mb-10 border-l-2 border-green-500/50 pl-4">{selectedProject.description}</p>
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
                    <div className="flex justify-between items-center text-[10px] font-mono text-green-500 mb-4 tracking-widest">
                      <span>● LIVE SPECS</span><span className="border border-green-500/30 px-2 py-0.5 rounded">CUSTOM</span>
                    </div>
                    <div className="space-y-3 border-t border-white/10 pt-4">
                      {[{ label: 'HEIGHT', value: `${selectedProject.specs?.height * 10} MM` }, { label: 'TOP DIA', value: `${selectedProject.specs?.top * 20} MM` }, { label: 'BOT DIA', value: `${selectedProject.specs?.bottom * 20} MM` }].map(spec => (
                        <div key={spec.label} className="flex justify-between items-center text-xs font-mono">
                          <span className="text-gray-500">{spec.label}</span><span className="text-white font-bold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="w-full h-0.5 bg-gray-800 mt-4 overflow-hidden rounded-full"><div className="w-2/3 h-full bg-green-500/50 animate-pulse"></div></div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-white text-black px-6 py-4 font-oswald font-bold text-sm tracking-wider hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">REQUEST QUOTE</button>
                    <button className="px-4 py-4 border border-white/20 hover:bg-white hover:text-black transition-all">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
