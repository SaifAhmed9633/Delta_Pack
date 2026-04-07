'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PlusIcon = () => (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>);
const EditIcon = () => (<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg>);
const TrashIcon = () => (<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>);
const UploadIcon = () => (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>);
const BoxIcon = () => (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>);

function DeleteModal({ product, onConfirm, onCancel }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4 text-red-400"><TrashIcon /></div>
        <h3 className="text-white font-oswald text-xl text-center mb-1">DELETE PRODUCT?</h3>
        <p className="text-gray-500 text-xs text-center font-mono mb-6">"{product?.client}" will be permanently removed.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 bg-white/5 text-white text-xs font-bold rounded-xl hover:bg-white/10 transition border border-white/10">CANCEL</button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-red-500 text-white text-xs font-bold rounded-xl hover:bg-red-600 transition">DELETE</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Toast({ message, type }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-mono font-bold shadow-2xl border backdrop-blur-md whitespace-nowrap ${type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-red-500/20 border-red-500/30 text-red-400'}`}>
      {type === 'success' ? '✓' : '✕'} {message}
    </motion.div>
  );
}

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    client: '', title: '', type: '', description: '', img: '',
    specs: { height: '', top: '', bottom: '' }
  });

  useEffect(() => { fetchProducts(); }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch { /* silent */ }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5000000) { showToast('Max image size is 5MB', 'error'); return; }
    const reader = new FileReader();
    reader.onloadend = () => setFormData(prev => ({ ...prev, img: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('spec_')) {
      const specName = name.replace('spec_', '');
      setFormData(prev => ({ ...prev, specs: { ...prev.specs, [specName]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({ client: '', title: '', type: '', description: '', img: '', specs: { height: '', top: '', bottom: '' } });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setFormData({ client: product.client, title: product.title || '', type: product.type, description: product.description, img: product.img, specs: product.specs || { height: '', top: '', bottom: '' } });
    setEditingId(product.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/products/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) { showToast('Product deleted'); fetchProducts(); }
      else showToast('Delete failed', 'error');
    } catch { showToast('Connection error', 'error'); }
    setDeleteTarget(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (data.success) { showToast(editingId ? 'Product updated!' : 'Product created!'); resetForm(); fetchProducts(); }
      else showToast(data.error || 'Save failed', 'error');
    } catch { showToast('Connection error', 'error'); }
    finally { setLoading(false); }
  };

  const inputClass = "w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500/20 outline-none transition-all";
  const labelClass = "text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-1.5 block";

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="sticky top-14 lg:top-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div>
            <h1 className="font-oswald text-xl sm:text-2xl font-bold text-white">DASHBOARD</h1>
            <p className="text-[10px] font-mono text-gray-600 mt-0.5">Product Management System</p>
          </div>
          <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <PlusIcon /> <span className="hidden sm:inline">ADD PRODUCT</span><span className="sm:hidden">ADD</span>
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'PRODUCTS', value: products.length, color: 'green', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg> },
            { label: 'TYPES', value: new Set(products.map(p => p.type)).size, color: 'blue', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" /></svg> },
          ].map(stat => (
            <div key={stat.label} className="bg-[#111] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center text-${stat.color}-400`}>{stat.icon}</div>
              <div><p className="text-[10px] font-mono text-gray-500 tracking-widest">{stat.label}</p><p className="text-2xl font-bold text-white font-oswald leading-none">{stat.value}</p></div>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-1 bg-[#111] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /></div>
            <div><p className="text-[10px] font-mono text-gray-500 tracking-widest">STATUS</p><p className="text-sm font-bold text-green-400 font-mono">ONLINE</p></div>
          </div>
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.section initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <h2 className="text-xs font-mono font-bold text-white tracking-widest">{editingId ? 'EDIT PRODUCT' : 'NEW PRODUCT'}</h2>
                  </div>
                  <button onClick={resetForm} className="text-gray-600 hover:text-white transition-colors p-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>Client Name *</label><input name="client" value={formData.client} onChange={handleChange} required className={inputClass} placeholder="e.g. Starbucks" /></div>
                    <div><label className={labelClass}>Product Type *</label><input name="type" value={formData.type} onChange={handleChange} required className={inputClass} placeholder="e.g. Hot Cup" /></div>
                  </div>
                  <div><label className={labelClass}>Title (Optional)</label><input name="title" value={formData.title} onChange={handleChange} className={inputClass} placeholder="e.g. Double Wall 12oz" /></div>
                  <div><label className={labelClass}>Description *</label><textarea name="description" value={formData.description} onChange={handleChange} rows={3} required className={`${inputClass} resize-none`} placeholder="Product details..." /></div>
                  <div>
                    <label className={labelClass}>Design Image</label>
                    <label className={`block cursor-pointer rounded-xl border-2 border-dashed transition-all ${formData.img ? 'border-green-500/40 bg-green-500/5' : 'border-white/10 hover:border-white/20 bg-black/30'}`}>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      {formData.img ? (
                        <div className="p-3 flex items-center gap-4">
                          <img src={formData.img} alt="Preview" className="h-20 w-20 rounded-lg object-cover border border-white/10 flex-shrink-0" />
                          <div><p className="text-xs text-green-400 font-mono font-bold">IMAGE LOADED</p><p className="text-[10px] text-gray-500 mt-1">Click to replace</p></div>
                        </div>
                      ) : (
                        <div className="py-8 flex flex-col items-center gap-2 text-gray-600"><UploadIcon /><span className="text-xs font-mono">Click to upload · Max 5MB</span></div>
                      )}
                    </label>
                  </div>
                  <div>
                    <label className={labelClass}>Dimensions</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['height', 'top', 'bottom'].map(spec => (
                        <div key={spec}>
                          <div className="relative">
                            <input type="number" step="0.1" name={`spec_${spec}`} value={formData.specs[spec]} onChange={handleChange} required className={`${inputClass} text-center pr-8`} placeholder="0" />
                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-gray-600 uppercase pointer-events-none">{spec[0]}</span>
                          </div>
                          <p className="text-[9px] font-mono text-gray-700 text-center mt-1 capitalize">{spec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={resetForm} className="flex-1 sm:flex-none sm:px-8 py-3 bg-white/5 text-white font-bold text-xs rounded-xl hover:bg-white/10 transition border border-white/10 font-mono tracking-wider">CANCEL</button>
                    <button type="submit" disabled={loading} className="flex-1 py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition font-mono tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                      {loading ? (<><svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>SAVING...</>) : (editingId ? 'UPDATE PRODUCT' : 'CREATE PRODUCT')}
                    </button>
                  </div>
                </form>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Inventory */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" /><h2 className="text-xs font-mono font-bold text-white tracking-widest">INVENTORY</h2></div>
            <span className="text-[10px] font-mono text-gray-600">{products.length} ITEMS</span>
          </div>
          {products.length === 0 ? (
            <div className="bg-[#111] rounded-2xl border border-white/10 py-16 flex flex-col items-center gap-3 text-gray-700">
              <BoxIcon /><p className="text-xs font-mono tracking-widest">NO PRODUCTS YET</p>
              <button onClick={() => setShowForm(true)} className="mt-2 text-xs font-mono text-green-500 hover:text-green-400 transition border border-green-500/20 px-4 py-2 rounded-xl hover:border-green-500/40">+ ADD FIRST PRODUCT</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {products.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-[#111] rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-200 overflow-hidden group">
                  <div className="relative h-36 bg-black overflow-hidden">
                    <img src={product.img || '/design.jpg'} alt={product.client} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[9px] font-mono font-bold px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-green-400 tracking-wider">{product.type}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-oswald font-bold text-white text-lg leading-tight truncate">{product.client}</h3>
                    {product.title && <p className="text-xs text-gray-500 mt-0.5 truncate">{product.title}</p>}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {[{ label: 'H', value: product.specs?.height }, { label: 'T', value: product.specs?.top }, { label: 'B', value: product.specs?.bottom }].map(s => (
                        <span key={s.label} className="text-[9px] font-mono text-gray-500 bg-white/5 border border-white/10 px-2 py-1 rounded-lg">{s.label}: {s.value}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => handleEdit(product)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-bold font-mono text-blue-400 bg-blue-500/10 rounded-xl hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20 hover:border-transparent"><EditIcon /> EDIT</button>
                      <button onClick={() => setDeleteTarget(product)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-bold font-mono text-red-400 bg-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20 hover:border-transparent"><TrashIcon /> DELETE</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>

      <AnimatePresence>{deleteTarget && <DeleteModal product={deleteTarget} onConfirm={handleDeleteConfirm} onCancel={() => setDeleteTarget(null)} />}</AnimatePresence>
      <AnimatePresence>{toast && <Toast message={toast.message} type={toast.type} />}</AnimatePresence>
    </div>
  );
}
