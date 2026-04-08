'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cartStore';
import { formatPrice } from '@/lib/products';

export default function CartDrawer() {
  const { isOpen, close, items, updateQty, removeItem, totals, clear } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-[80] bg-[#0a0a0a] border-l border-white/10 flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div>
                <div className="text-[10px] font-mono tracking-[0.3em] text-green-400">YOUR BAG</div>
                <div className="font-oswald text-2xl tracking-wide mt-1">
                  {totals.count} {totals.count === 1 ? 'ITEM' : 'ITEMS'}
                </div>
              </div>
              <button
                onClick={close}
                aria-label="Close cart"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-3xl">
                    ⌁
                  </div>
                  <div className="font-oswald text-xl tracking-wider">YOUR BAG IS EMPTY</div>
                  <p className="text-xs font-mono text-gray-500 max-w-[240px]">
                    Add a cup from the showcase to get started.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((it) => (
                    <li
                      key={it.id}
                      className="flex gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                    >
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${it.bodyColor}, ${it.accent}33)`,
                          color: it.accent,
                          boxShadow: `0 0 24px ${it.accent}22`,
                        }}
                      >
                        ⌯
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="font-oswald text-base tracking-wide truncate">{it.name}</div>
                            <div className="text-[10px] font-mono text-gray-500 tracking-widest truncate">
                              {it.tagline}
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(it.id)}
                            className="text-gray-500 hover:text-red-400 text-xs font-mono"
                            aria-label="Remove"
                          >
                            REMOVE
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-white/10 rounded-full overflow-hidden">
                            <button
                              onClick={() => updateQty(it.id, it.qty - 1)}
                              className="w-7 h-7 text-sm hover:bg-white/10"
                            >
                              −
                            </button>
                            <span className="w-7 text-center text-xs font-mono">{it.qty}</span>
                            <button
                              onClick={() => updateQty(it.id, it.qty + 1)}
                              className="w-7 h-7 text-sm hover:bg-white/10"
                            >
                              +
                            </button>
                          </div>
                          <div className="font-mono text-sm">{formatPrice(it.price * it.qty)}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5 space-y-4 bg-black/40">
                <div className="flex items-center justify-between text-sm font-mono">
                  <span className="text-gray-400 tracking-widest">SUBTOTAL</span>
                  <span className="text-white font-bold text-lg">{formatPrice(totals.subtotal)}</span>
                </div>
                <button className="w-full bg-white text-black py-4 font-oswald font-bold text-sm tracking-[0.2em] hover:bg-green-400 transition-colors">
                  CHECKOUT →
                </button>
                <button
                  onClick={clear}
                  className="w-full text-[10px] font-mono text-gray-500 hover:text-white tracking-widest"
                >
                  CLEAR BAG
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
