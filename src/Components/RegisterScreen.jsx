import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Upload, X, User, Calendar, CreditCard, Flag, Phone, Badge, Camera } from "lucide-react";

const RegisterScreen = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    surname: '',
    birthday: '',
    id_pass: '',
    country: '',
    phone: '',
    id_badge: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      toast.success('Rasm tanlandi');
    }
  };

  const validateForm = () => {
    const requiredFields = ['first_name', 'last_name', 'surname', 'birthday', 'id_pass', 'country', 'phone', 'id_badge'];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${t(field) || field} maydoni to'ldirilishi shart`);
        return false;
      }
    }
    
    if (!file) {
      toast.error('Rasm tanlash majburiy');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    const apiFormData = new FormData();
    // Barcha form ma'lumotlarini qo'shamiz
    Object.entries(formData).forEach(([key, value]) => {
      apiFormData.append(key, value);
    });
    // Rasmni qo'shamiz
    apiFormData.append('user_image', file);
    
    try {
      const res = await fetch("https://qr.abdugafforov.uz/register/", {
        method: "POST",
        body: apiFormData,
        mode: "cors",
      });

      const data = await res.json();
      
      if (res.ok && data?.qr_code_url) {
        toast.success("QR kod muvaffaqiyatli ro'yxatdan o'tkazildi!");
        resetForm();
        // QR kod URL sini ishlatsangiz bo'ladi: data.qr_code_url
      } else {
        toast.error(data?.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      console.error(err);
      toast.error("Tizimda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      surname: '',
      birthday: '',
      id_pass: '',
      country: '',
      phone: '',
      id_badge: ''
    });
    setFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-base-200 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-primary text-primary-content p-4">
          <h2 className="text-2xl font-bold text-center">QR Orqali Ro'yxatdan O'tish</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ism */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center">
                  <User size={16} className="mr-2" /> Ism <span className="text-error ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Ism"
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">string (formData)</span>
              </label>
            </div>
            
            {/* Familiya */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center">
                  <User size={16} className="mr-2" /> Familiya <span className="text-error ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Familiya"
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">string (formData)</span>
              </label>
            </div>
            
            {/* Otasining ismi */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center">
                  <User size={16} className="mr-2" /> Otasining ismi <span className="text-error ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Otasining ismi"
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">string (formData)</span>
              </label>
            </div>
            
            {/* Tug'ilgan sana */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center">
                  <Calendar size={16} className="mr-2" /> Tug'ilgan sana <span className="text-error ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                placeholder="YYYY.MM.DD"
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">string (formData)</span>
              </label>
            </div>
            
            {/* Pasport raqami */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center">
                  <CreditCard size={16} className="mr-2" /> Pasport raqami <span className="text-error ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="id_pass"
                value={formData.id_pass}
                onChange={handleChange}
                placeholder="Pasport raqami"
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">string (formData)</span>
              </label>
            </div>
            
            {/* Mamlakat */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center">
                  <Flag size={16} className="mr-2" /> Mamlakat <span className="text-error ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Mamlakat"
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">string (formData)</span>
              </label>
            </div>
            
            {/* Telefon */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center">
                  <Phone size={16} className="mr-2" /> Telefon <span className="text-error ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+998XXXXXXXXX"
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">string (formData)</span>
              </label>
            </div>
            
            {/* ID raqami */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center">
                  <Badge size={16} className="mr-2" /> ID raqami <span className="text-error ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="id_badge"
                value={formData.id_badge}
                onChange={handleChange}
                placeholder="ID raqami"
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">string (formData)</span>
              </label>
            </div>
          </div>
          
          {/* Rasm yuklash */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium flex items-center">
                <Camera size={16} className="mr-2" /> Foydalanuvchi rasmi
              </span>
            </label>
            
            <div 
              className="border-2 border-dashed border-base-300 rounded-lg p-4 text-center cursor-pointer hover:bg-base-300/20 transition-all"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              
              {!previewUrl ? (
                <div className="flex flex-col items-center py-8">
                  <Upload size={36} className="text-base-content/60" />
                  <p className="mt-2 text-base-content/60">Rasm yuklash uchun bosing</p>
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-64 mx-auto object-contain rounded-md" 
                  />
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setPreviewUrl('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="btn btn-circle btn-sm btn-error absolute top-2 right-2"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              
              <label className="label justify-center">
                <span className="label-text-alt text-gray-500">file (formData)</span>
              </label>
            </div>
          </div>
          
          {/* Tugmalar */}
          <div className="flex gap-4 pt-4">
            <button 
              type="submit" 
              className="btn btn-primary flex-1"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Yuborilmoqda...
                </>
              ) : (
                "Ro'yxatdan o'tish"
              )}
            </button>
            
            <button 
              type="button" 
              onClick={resetForm}
              className="btn btn-outline flex-1"
              disabled={loading}
            >
              <X size={16} className="mr-1" /> Tozalash
            </button>
          </div>
        </form>
      </div>
      
      {/* Toast notifikatsiyalar */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default RegisterScreen;