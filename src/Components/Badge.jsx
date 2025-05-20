import React, { useState, useRef } from 'react';
import { User, Building, Phone, Calendar, FileText, Globe, QrCode, Upload, Loader2 } from 'lucide-react';

export default function ModernBadgeForm() {
  const fileInputRef = useRef();
  const [image, setImage] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    surname: '',
    country: '',
    birthday: '',
    id_pass: '',
    phone: '',
    id_badge: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const getCookie = (name) => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
  };
  
  const handleSubmit = async () => {
    setLoading(true);
  
    const form = new FormData();
    form.append('first_name', formData.first_name);
    form.append('last_name', formData.last_name);
    form.append('surname', formData.surname);
    form.append('birthday', formData.birthday);
    form.append('id_pass', formData.id_pass);
    form.append('country', formData.country);
    form.append('phone', formData.phone);
    form.append('id_badge', formData.id_badge);
  
    if (formData.user_image) {
      form.append('user_image', formData.user_image);
    }
  
    try {
      const csrfToken = getCookie('csrftoken');
  
      const response = await fetch('https://hajgov.com/api/qr-register/', {
        method: 'POST',
        body: form,
        credentials: 'include',
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
  
      if (!response.ok) throw new Error(`Xatolik: ${response.status}`);
  
      const data = await response.json();
      if (data.id_card && data.id_card.qr_image) {
        // Bu yerda to‘liq URL yasash kerak, agar qr_image faqat path bo‘lsa
        const baseUrl = 'https://hajgov.com'; // o‘z domeningni qo‘y
        setQrCodeUrl(baseUrl + data.id_card.qr_image);
      } else {
        console.warn('QR rasm URL yo‘q:', data);
      }
    } catch (err) {
      console.error('Xatolik:', err);
      alert('QR olishda muammo bo‘ldi.');
    } finally {
      setLoading(false);
    }
  };
  
  


  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-xl shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold">ID Badge Generator</h1>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm opacity-80">ID Card System</span>
            <QrCode className="text-white h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="bg-white rounded-b-xl shadow-lg p-6">
        {/* Profile Photo Upload */}
        <div className="flex justify-center mb-8">
          <div 
            onClick={() => fileInputRef.current.click()}
            className="relative w-32 h-32 rounded-full bg-gray-100 border-4 border-blue-500 flex items-center justify-center cursor-pointer overflow-hidden group"
          >
            {image ? (
              <img 
                src={URL.createObjectURL(image)} 
                className="w-full h-full object-cover"
                alt="Profile" 
              />
            ) : (
              <User className="w-16 h-16 text-gray-400" />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4 md:col-span-2">
            <h2 className="text-lg font-medium text-gray-700 border-b pb-2">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600 mb-1">First Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    type="text"
                    placeholder="First Name"
                    className=" text-black w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600 mb-1">Last Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Last Name"
                    className="text-black w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600 mb-1">Surname <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    type="text"
                    placeholder="Surname"
                    className="text-black w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Legal Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700 border-b pb-2">Legal Information</h2>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  type="text"
                  placeholder="YYYY-MM-DD"
                  className="text-black w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">Passport Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  name="id_pass"
                  value={formData.id_pass}
                  onChange={handleChange}
                  type="text"
                  placeholder="Passport Number"
                  className=" text-black  w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">ID Badge Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  name="id_badge"
                  value={formData.id_badge}
                  onChange={handleChange}
                  type="text"
                  placeholder="Badge Number"
                  className="text-black w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-700 border-b pb-2">Contact Information</h2>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">Country <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  type="text"
                  placeholder="Country"
                  className="text-black  w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Phone Number"
                  className="text-black w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Result */}
        {qrCodeUrl && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg flex justify-center">
            <div className="flex flex-col items-center">
              <h3 className="text-gray-700 font-medium mb-3">Your QR Code</h3>
              <div className="bg-white p-3 rounded-lg shadow-md mb-3">
                <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
              </div>
              <button className="text-sm bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Download QR Code
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg font-medium text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-70 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>Submit Information</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}