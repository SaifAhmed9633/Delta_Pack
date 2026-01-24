'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    client: '', title: '', type: '', desc: '', img: '',
    specs: { height: '', top: '', bottom: '' }
  });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) { console.error('Failed to fetch'); }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5000000) { alert("Max 5MB!"); return; }
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
    setFormData({ client: '', title: '', type: '', desc: '', img: '', specs: { height: '', top: '', bottom: '' } });
    setEditingId(null);
    setMessage('');
  };

  const handleEdit = (product) => {
    setFormData({
      client: product.client, title: product.title || '', type: product.type,
      desc: product.desc, img: product.img,
      specs: product.specs || { height: '', top: '', bottom: '' }
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) { setMessage('✓ Deleted'); fetchProducts(); }
    } catch { setMessage('Error deleting'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(editingId ? '✓ Updated!' : '✓ Created!');
        resetForm();
        fetchProducts();
      } else {
        setMessage('Error: ' + (data.error || 'Failed'));
      }
    } catch { setMessage('Connection error'); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-oswald font-bold text-white">DASHBOARD</h1>
          <p className="text-gray-500 text-xs font-mono mt-1">Product Management</p>
        </div>
        <div className="flex items-center gap-3 bg-[#111] px-4 py-2 rounded-lg border border-white/10">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-mono text-gray-400">PRODUCTS:</span>
          <span className="text-lg font-bold text-green-500 font-mono">{products.length}</span>
        </div>
      </header>

      {/* ADD/EDIT FORM */}
      <section className="mb-10">
        <div className="bg-[#111] rounded-xl border border-white/10 p-4 sm:p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            {editingId ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Client, Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 block">Client Name</label>
                <input name="client" value={formData.client} onChange={handleChange} required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-green-500 focus:outline-none transition"
                  placeholder="e.g. Starbucks" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 block">Product Type</label>
                <input name="type" value={formData.type} onChange={handleChange} required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-green-500 focus:outline-none transition"
                  placeholder="e.g. Hot Cup" />
              </div>
            </div>

            {/* Row 2: Title */}
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 block">Title (Optional)</label>
              <input name="title" value={formData.title} onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-green-500 focus:outline-none transition"
                placeholder="e.g. Double Wall 12oz" />
            </div>

            {/* Row 3: Description */}
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 block">Description</label>
              <textarea name="desc" value={formData.desc} onChange={handleChange} rows={2} required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-green-500 focus:outline-none transition resize-none"
                placeholder="Product details..." />
            </div>

            {/* Row 4: Image Upload */}
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 block">Design Image</label>
              <label className={`block cursor-pointer border-2 border-dashed rounded-lg p-4 text-center transition ${formData.img ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-white/30'}`}>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                {formData.img ? (
                  <img src={formData.img} alt="Preview" className="h-24 mx-auto rounded-lg object-contain" />
                ) : (
                  <div className="py-2">
                    <div className="text-2xl mb-1 opacity-40">📷</div>
                    <span className="text-xs text-gray-500">Click to upload (Max 5MB)</span>
                  </div>
                )}
              </label>
            </div>

            {/* Row 5: Specs */}
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 block">Dimensions</label>
              <div className="grid grid-cols-3 gap-3">
                {['height', 'top', 'bottom'].map(spec => (
                  <div key={spec} className="relative">
                    <input type="number" step="0.1" name={`spec_${spec}`} value={formData.specs[spec]} onChange={handleChange} required
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white text-center focus:border-green-500 focus:outline-none transition"
                      placeholder="0" />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-gray-600 uppercase">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              {editingId && (
                <button type="button" onClick={resetForm} className="flex-1 py-3 bg-white/5 text-white font-bold text-xs rounded-lg hover:bg-white/10 transition border border-white/10">
                  CANCEL
                </button>
              )}
              <button type="submit" disabled={loading} className="flex-1 py-3 bg-green-600 text-white font-bold text-xs rounded-lg hover:bg-green-500 transition disabled:opacity-50">
                {loading ? 'SAVING...' : (editingId ? 'UPDATE' : 'CREATE PRODUCT')}
              </button>
            </div>

            {/* Message */}
            {message && (
              <div className={`p-3 rounded-lg text-center text-xs font-bold ${message.includes('✓') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* PRODUCTS LIST */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            INVENTORY
          </h2>
          <span className="text-[10px] text-gray-500 font-mono">{products.length} items</span>
        </div>

        {products.length === 0 ? (
          <div className="bg-[#111] rounded-xl border border-white/10 p-12 text-center">
            <div className="text-4xl mb-3 opacity-20">📦</div>
            <p className="text-gray-500 text-sm">No products yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product._id} className="bg-[#111] rounded-xl border border-white/10 p-4 hover:border-green-500/30 transition group">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={product.img} alt={product.client} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-white text-sm truncate">{product.client}</h3>
                      <span className="text-[9px] px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded border border-green-500/20 flex-shrink-0">{product.type}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">{product.title}</p>
                    <div className="flex gap-1.5 mt-2 text-[9px] font-mono text-gray-600">
                      <span className="bg-white/5 px-1.5 py-0.5 rounded">H:{product.specs?.height}</span>
                      <span className="bg-white/5 px-1.5 py-0.5 rounded">T:{product.specs?.top}</span>
                      <span className="bg-white/5 px-1.5 py-0.5 rounded">B:{product.specs?.bottom}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                  <button onClick={() => handleEdit(product)} className="flex-1 py-2 text-xs font-bold text-blue-400 bg-blue-500/10 rounded-lg hover:bg-blue-500 hover:text-white transition">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="flex-1 py-2 text-xs font-bold text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500 hover:text-white transition">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}