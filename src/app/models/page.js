'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// استدعاء الكوب 3D
const CupShowcase = dynamic(() => import('@/components/CupShowcase'), { 
  ssr: false, 
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#050505]">
      <div className="text-green-500 font-mono text-xs tracking-[0.5em] animate-pulse">INITIALIZING STUDIO...</div>
    </div>
  )
});

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [products, setProducts] = useState([]); // هنا هنخزن منتجات الداتابيز
  const [loading, setLoading] = useState(true);

  // جلب البيانات من الداتابيز أول ما الصفحة تفتح
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="min-h-screen bg-[#050505] text-white selection:bg-green-500 selection:text-black relative overflow-hidden">
      
      {/* الخلفية */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-900/10 to-transparent"></div>
      </div>

      <div className="relative z-10 px-6 py-24 md:px-16 max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-10">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="text-green-500 font-mono text-xs tracking-[0.4em] mb-4 block"
            >
              / SELECTED WORKS
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-oswald font-bold uppercase leading-[0.9]"
            >
              Client <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Success</span>
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex gap-8 text-right hidden md:flex"
          >
             <div>
               <h3 className="text-2xl font-oswald font-bold">{products.length}</h3>
               <p className="text-gray-500 text-xs font-mono tracking-widest">ACTIVE PROJECTS</p>
             </div>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading ? (
           <div className="w-full h-64 flex items-center justify-center text-green-500 font-mono text-xs tracking-widest animate-pulse">
             CONNECTING TO DATABASE...
           </div>
        ) : (
          /* Grid Section - Products from DB */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <motion.div 
                key={item._id}
                layoutId={`card-${item._id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProject(item)}
                className="group cursor-pointer relative"
              >
                <div className="relative h-[400px] bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 transition-all duration-500 group-hover:border-green-500/30 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
                  
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                    style={{ backgroundImage: `url(${item.img || '/design.jpg'})` }}
                  />

                  <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                     <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
                        <div>
                          <p className="text-green-500 font-mono text-[10px] tracking-widest mb-1">{item.type}</p>
                          <h3 className="text-3xl font-oswald font-bold uppercase">{item.client}</h3>
                        </div>
                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-green-500 group-hover:text-black group-hover:border-green-500 transition-all">
                          ↗
                        </span>
                     </div>
                     <p className="text-gray-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                       {item.desc}
                     </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Modal / Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 cursor-pointer"
            />

            <motion.div 
              layoutId={`card-${selectedProject._id}`}
              className="fixed inset-4 md:inset-10 bg-[#080808] border border-white/10 z-50 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                ✕
              </button>

              {/* 3D Scene */}
              <div className="w-full md:w-2/3 h-[50vh] md:h-full relative bg-gradient-to-b from-[#111] to-[#050505]">
                 <div className="absolute top-8 left-8 z-10 pointer-events-none">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                    <span className="text-green-500 font-mono text-[10px] tracking-widest">LIVE RENDER</span>
                 </div>
                 <div className="w-full h-full cursor-grab active:cursor-grabbing">
                    <CupShowcase config={selectedProject.specs} texturePath={selectedProject.img} />
                 </div>
              </div>

              {/* Details */}
              <div className="w-full md:w-1/3 h-auto md:h-full bg-[#0c0c0c] border-l border-white/5 p-8 md:p-12 flex flex-col overflow-y-auto">
                 <motion.div 
                   initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                 >
                    <h2 className="text-5xl font-oswald font-bold mb-2 uppercase">{selectedProject.client}</h2>
                    <p className="text-gray-300 text-sm leading-relaxed mb-10">
                      {selectedProject.desc}
                    </p>

                    <div className="bg-[#111] rounded-lg p-6 border border-white/5 relative overflow-hidden">
                       <h4 className="text-white font-mono text-xs mb-4">TECHNICAL SPECIFICATIONS</h4>
                       <div className="space-y-4 font-mono text-xs">
                         <div className="flex justify-between"><span className="text-gray-500">HEIGHT</span><span className="text-white">{selectedProject.specs.height * 10} mm</span></div>
                         <div className="flex justify-between"><span className="text-gray-500">TOP DIA</span><span className="text-white">{selectedProject.specs.top * 20} mm</span></div>
                         <div className="flex justify-between"><span className="text-gray-500">BOTTOM DIA</span><span className="text-white">{selectedProject.specs.bottom * 20} mm</span></div>
                       </div>
                    </div>
                 </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}