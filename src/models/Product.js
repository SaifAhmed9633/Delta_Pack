import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  // اسم العميل (زي ستاربكس)
  client: { 
    type: String, 
    required: true 
  },
  // عنوان المنتج
  title: { 
    type: String 
  },
  // نوع الكوب (زي 16oz)
  type: { 
    type: String 
  },
  // الوصف
  desc: { 
    type: String 
  },
  // رابط الصورة
  img: { 
    type: String 
  },
  // المواصفات الفنية
  specs: {
    height: Number,
    top: Number,
    bottom: Number
  }
}, { timestamps: true }); // بيضيف تاريخ الإنشاء أوتوماتيك

// بنقوله: لو الموديل موجود هات القديم، لو مش موجود اعمل واحد جديد
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);