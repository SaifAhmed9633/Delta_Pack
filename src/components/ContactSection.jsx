'use client';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-[#050505] py-24 px-6 md:px-20 border-t border-white/10 overflow-hidden">
      
      {/* خلفية جمالية (خريطة العالم منقطة مثلاً أو تدرج) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-green-900/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
        
        {/* اليسار: معلومات التواصل */}
        <div>
          <span className="text-green-500 font-mono text-xs tracking-widest mb-4 block">READY TO SCALE?</span>
          <h2 className="text-4xl md:text-6xl font-oswald font-bold text-white mb-6">
            GET A <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">QUOTE</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10 max-w-md">
            فريق المبيعات جاهز للرد على استفسارك خلال 24 ساعة. 
            نقدم أسعاراً تنافسية للكميات الكبيرة وعقود التوريد السنوية.
          </p>

          <div className="space-y-8 font-mono text-sm">
            <div className="flex items-start gap-4">
              <span className="text-green-500 text-xl">●</span>
              <div>
                <p className="text-gray-500 text-xs mb-1">SALES HOTLINE</p>
                <p className="text-white text-lg tracking-wider hover:text-green-400 transition-colors cursor-pointer">
                  +20 100 000 0000
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-green-500 text-xl">●</span>
              <div>
                <p className="text-gray-500 text-xs mb-1">EMAIL</p>
                <p className="text-white text-lg tracking-wider hover:text-green-400 transition-colors cursor-pointer">
                  sales@deltapack.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-green-500 text-xl">●</span>
              <div>
                <p className="text-gray-500 text-xs mb-1">FACTORY LOCATION</p>
                <p className="text-gray-300">
                  Industrial Zone 3, Lot 45<br/>
                  10th of Ramadan City, Egypt
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* اليمين: نموذج الطلب (Form) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0a0a0a] border border-white/10 p-8 md:p-10"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500">FULL NAME</label>
                <input type="text" className="w-full bg-[#111] border border-white/10 text-white p-3 focus:border-green-500 focus:outline-none transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500">COMPANY NAME</label>
                <input type="text" className="w-full bg-[#111] border border-white/10 text-white p-3 focus:border-green-500 focus:outline-none transition-colors" placeholder="Delta Cafe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-500">EMAIL ADDRESS</label>
              <input type="email" className="w-full bg-[#111] border border-white/10 text-white p-3 focus:border-green-500 focus:outline-none transition-colors" placeholder="info@company.com" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500">CUP SIZE</label>
                <select className="w-full bg-[#111] border border-white/10 text-white p-3 focus:border-green-500 focus:outline-none transition-colors appearance-none">
                  <option>16 oz (Bowl)</option>
                  <option>12 oz</option>
                  <option>8 oz</option>
                  <option>4 oz</option>
                  <option>Mixed Order</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500">QUANTITY (PCS)</label>
                <input type="number" className="w-full bg-[#111] border border-white/10 text-white p-3 focus:border-green-500 focus:outline-none transition-colors" placeholder="e.g. 50,000" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-500">ADDITIONAL DETAILS</label>
              <textarea rows="4" className="w-full bg-[#111] border border-white/10 text-white p-3 focus:border-green-500 focus:outline-none transition-colors" placeholder="Tell us more about your needs..."></textarea>
            </div>

            <button type="submit" className="w-full bg-white text-black font-oswald font-bold py-4 hover:bg-green-500 hover:text-white transition-all tracking-wider text-sm mt-4">
              SEND REQUEST
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}