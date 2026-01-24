'use client';
import { useState, useEffect } from 'react';
// useRouter and Logout logic managed by Sidebar now

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    client: '',
    title: '',
    type: '',
    desc: '',
    img: '',
    specs: { height: '', top: '', bottom: '' }
  });

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch products');
    }
  };

  // Upload Image Logic
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        alert("Image is too large! Please choose an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('spec_')) {
      const specName = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        specs: { ...prev.specs, [specName]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Populate form for editing
  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      client: product.client,
      title: product.title || '',
      type: product.type || '',
      desc: product.desc || '',
      img: product.img || '',
      specs: {
        height: product.specs?.height || '',
        top: product.specs?.top || '',
        bottom: product.specs?.bottom || ''
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMessage('✏️ Editing Mode Activated');
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
        setMessage('🗑️ Product Deleted');
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  // Cancel Edit
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      client: '', title: '', type: '', desc: '', img: '',
      specs: { height: '', top: '', bottom: '' }
    });
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = "";
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const payload = {
      ...formData,
      specs: {
        height: parseFloat(formData.specs.height) || 0,
        top: parseFloat(formData.specs.top) || 0,
        bottom: parseFloat(formData.specs.bottom) || 0
      }
    };

    try {
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(editingId ? '✅ Product Updated!' : '✅ Product Added!');
        resetForm();
        fetchProducts();
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Connection Error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-oswald text-white tracking-wide">DASHBOARD</h2>
          <p className="text-gray-400 text-sm mt-1 font-mono">Manage your product catalog</p>
        </div>
        <div className="text-right w-full md:w-auto flex justify-between md:block bg-white/5 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none border md:border-none border-white/10">
          <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Total Products</p>
          <p className="text-2xl md:text-3xl font-bold text-delta-green font-mono leading-none">{products.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* Left Column: Form */}
        <div className="xl:col-span-5 h-fit lg:sticky lg:top-8 order-1">
          <div className="glass-card p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group/form">
            {/* Ambient Background Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/20 blur-[100px] rounded-full group-hover/form:bg-green-500/30 transition-all duration-700"></div>

            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white relative z-10">
              <span className="w-2 h-2 rounded-full bg-delta-green shadow-[0_0_10px_#22c55e]"></span>
              {editingId ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1 group-focus-within:text-delta-green transition-colors">Client</label>
                  <input type="text" name="client" value={formData.client} onChange={handleChange} required className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-sm outline-none text-white focus:border-delta-green focus:bg-black/60 transition-all placeholder:text-gray-700" placeholder="e.g. Starbucks" />
                </div>
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1 group-focus-within:text-delta-green transition-colors">Type</label>
                  <input type="text" name="type" value={formData.type} onChange={handleChange} required className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-sm outline-none text-white focus:border-delta-green focus:bg-black/60 transition-all placeholder:text-gray-700" placeholder="e.g. Hot Cup" />
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1 group-focus-within:text-delta-green transition-colors">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-sm outline-none text-white focus:border-delta-green focus:bg-black/60 transition-all placeholder:text-gray-700" placeholder="e.g. Double Wall 12oz" />
              </div>

              <div className="group">
                <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1 group-focus-within:text-delta-green transition-colors">Description</label>
                <textarea name="desc" value={formData.desc} onChange={handleChange} rows="3" required className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-sm outline-none text-white focus:border-delta-green focus:bg-black/60 transition-all placeholder:text-gray-700" placeholder="Product details..." />
              </div>

              {/* Image Upload */}
              <div className={`border-2 border-dashed p-6 rounded-xl text-center transition-all duration-300 ${formData.img ? 'border-delta-green/50 bg-delta-green/5' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}>
                <label className="block cursor-pointer">
                  <input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  {formData.img ? (
                    <div className="relative group">
                      <img src={formData.img} alt="Preview" className="h-32 mx-auto rounded-lg shadow-lg object-contain" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg backdrop-blur-sm">
                        <span className="text-xs font-bold text-white tracking-widest">CHANGE IMAGE</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div className="text-2xl mb-2 opacity-50">📷</div>
                      <span className="text-xs font-bold text-gray-400 tracking-widest">CLICK TO UPLOAD</span>
                      <p className="text-[10px] text-gray-600 mt-1">JPG, PNG (Max 2MB)</p>
                    </div>
                  )}
                </label>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-3">
                {['height', 'top', 'bottom'].map((spec) => (
                  <div key={spec} className="group">
                    <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1 group-focus-within:text-delta-green transition-colors">{spec}</label>
                    <input
                      type="number"
                      step="0.1"
                      name={`spec_${spec}`}
                      value={formData.specs[spec]}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/40 border border-white/10 p-2 rounded-lg text-center text-sm outline-none text-white focus:border-delta-green focus:bg-black/60 transition-all"
                    />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                {editingId && (
                  <button type="button" onClick={resetForm} className="flex-1 py-3 bg-white/5 font-bold rounded-lg hover:bg-white/10 uppercase text-xs tracking-wider border border-white/10 transition-colors">
                    Cancel
                  </button>
                )}
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-green-600 font-bold rounded-lg hover:bg-green-500 uppercase transition-all text-xs tracking-wider shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] active:scale-[0.98]">
                  {loading ? 'PROCESSING...' : (editingId ? 'SAVE CHANGES' : 'CREATE PRODUCT')}
                </button>
              </div>

              {message && (
                <div className={`p-3 rounded-lg text-center font-bold text-xs ${message.includes('Error') || message.includes('Connection') ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Column: List of Products */}
        <div className="xl:col-span-7 space-y-4">
          <div className="flex justify-between items-end mb-2">
            <h3 className="text-lg font-bold text-white">INVENTORY</h3>
            <div className="text-[10px] text-gray-500 font-mono">SORT BY: RECENT</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product._id} className="glass-card group p-4 rounded-xl hover:border-delta-green/30 transition-all duration-300 hover:transform hover:-translate-y-1 flex gap-4 relative overflow-hidden">
                {/* Image */}
                <div className="w-20 h-20 bg-black/50 rounded-lg flex-shrink-0 border border-white/5 overflow-hidden backdrop-blur-sm">
                  <img src={product.img} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 z-10">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-white truncate font-oswald tracking-wide">{product.client}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/5 font-mono group-hover:border-delta-green/30 transition-colors">{product.type}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 truncate group-hover:text-gray-200 transition-colors">{product.title}</p>
                  <p className="text-[10px] text-gray-500 mt-2 font-mono flex gap-2">
                    <span className="bg-white/5 px-1 rounded">H: {product.specs?.height}</span>
                    <span className="bg-white/5 px-1 rounded">T: {product.specs?.top}</span>
                    <span className="bg-white/5 px-1 rounded">B: {product.specs?.bottom}</span>
                  </p>
                </div>

                {/* Actions (Hover) */}
                <div className="absolute right-2 bottom-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 z-20">
                  <button onClick={() => handleEdit(product)} className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20 backdrop-blur-md" title="Edit">
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-500/20 backdrop-blur-md" title="Delete">
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-white/5 rounded-xl">
                <p className="text-gray-500">Inventory is empty.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}