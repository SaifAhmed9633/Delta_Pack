'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionCup } from '@/lib/cupContext';

const cupSizes = ['4 oz – Espresso', '8 oz – Standard', '12 oz – Large', '16 oz – Bowl', 'Mixed Order'];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', company: '', email: '', size: '', qty: '', details: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);
  useSectionCup('contact', sectionRef);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#050505] py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-white/[0.05] overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-2/3 bg-green-900/4 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-sky-900/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* LEFT — Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-green-400" />
                <span className="text-[10px] font-mono text-green-400 tracking-[0.35em]">READY TO SCALE?</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-oswald font-bold text-white leading-[0.9] mb-6">
                GET A<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}>
                  CUSTOM
                </span>
                <br />QUOTE
                <span className="text-green-400">.</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-10">
                فريق المبيعات جاهز للرد على استفسارك خلال 24 ساعة.
                نقدم أسعاراً تنافسية للكميات الكبيرة وعقود التوريد السنوية.
              </p>
            </motion.div>

            {/* Contact items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              {[
                {
                  label: 'SALES HOTLINE',
                  value: '+20 100 000 0000',
                  icon: '📞',
                  href: 'tel:+201000000000',
                },
                {
                  label: 'EMAIL',
                  value: 'sales@deltapack.com',
                  icon: '✉️',
                  href: 'mailto:sales@deltapack.com',
                },
                {
                  label: 'FACTORY',
                  value: 'Industrial Zone 3, 10th of Ramadan City, Egypt',
                  icon: '📍',
                  href: null,
                },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-base shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-[9px] font-mono tracking-[0.25em] text-gray-600 mb-1">{c.label}</div>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-white text-sm font-mono hover:text-green-400 transition-colors"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-gray-400 text-sm leading-relaxed">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mt-10"
            >
              {['ISO 9001', 'PEFC CERTIFIED', 'FOOD GRADE', 'GERMAN TECH'].map((b) => (
                <div
                  key={b}
                  className="text-[9px] font-mono tracking-[0.2em] text-gray-500 border border-white/[0.08] rounded-full px-3 py-1.5"
                >
                  {b}
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
          >
            {/* Form header accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />

            <div className="p-8 md:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center text-4xl"
                    >
                      ✓
                    </motion.div>
                    <div>
                      <div className="font-oswald text-2xl text-white mb-2">REQUEST SENT!</div>
                      <p className="text-gray-500 text-sm">
                        شكراً لتواصلك — سنرد عليك خلال 24 ساعة.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[10px] font-mono text-gray-600 hover:text-green-400 tracking-widest transition-colors"
                    >
                      SEND ANOTHER REQUEST
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="text-[10px] font-mono text-gray-500 tracking-[0.25em] mb-6">
                      REQUEST QUOTE — FILL DETAILS BELOW
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="FULL NAME" name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} />
                      <Field label="COMPANY" name="company" type="text" placeholder="Delta Cafe" value={form.company} onChange={handleChange} />
                    </div>

                    <Field label="EMAIL ADDRESS" name="email" type="email" placeholder="info@company.com" value={form.email} onChange={handleChange} required />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-gray-500 tracking-[0.2em]">CUP SIZE</label>
                        <select
                          name="size"
                          value={form.size}
                          onChange={handleChange}
                          className="w-full bg-[#0d0d0d] border border-white/[0.08] text-white text-sm p-3 rounded-xl focus:border-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500/20 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select size…</option>
                          {cupSizes.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <Field label="QUANTITY (PCS)" name="qty" type="number" placeholder="e.g. 50,000" value={form.qty} onChange={handleChange} />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-gray-500 tracking-[0.2em]">ADDITIONAL DETAILS</label>
                      <textarea
                        name="details"
                        rows={4}
                        value={form.details}
                        onChange={handleChange}
                        placeholder="Tell us about your branding needs, delivery location, etc."
                        className="w-full bg-[#0d0d0d] border border-white/[0.08] text-white text-sm p-3 rounded-xl focus:border-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500/20 transition-all resize-none placeholder:text-gray-700"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full relative bg-white text-black font-oswald font-bold py-4 rounded-xl text-sm tracking-[0.2em] hover:bg-green-400 transition-all overflow-hidden disabled:opacity-60"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            SENDING…
                          </>
                        ) : (
                          <>
                            SEND REQUEST
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </>
                        )}
                      </span>
                    </button>

                    <p className="text-[9px] font-mono text-gray-700 text-center tracking-widest">
                      WE REPLY WITHIN 24H · NO SPAM, EVER
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type, placeholder, value, onChange, required }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-mono text-gray-500 tracking-[0.2em]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[#0d0d0d] border border-white/[0.08] text-white text-sm p-3 rounded-xl focus:border-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500/20 transition-all placeholder:text-gray-700"
      />
    </div>
  );
}
