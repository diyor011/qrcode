import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

const QRCodeUploader = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('https://qr.abdugafforov.uz/upload/', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setQrCodeUrl(`https://qr.abdugafforov.uz${data.qr_code_url}`);
    } catch (err) {
      console.error("Yuklashda xatolik", err);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setFile(null);
    setPreviewUrl('');
    setQrCodeUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-black rounded-3xl overflow-hidden p-6 max-w-xs w-full shadow-lg">
    <div className="text-center text-white">
      <h2 className="text-lg font-semibold mb-4">Rasm yuklash</h2>
      <div className="border border-dashed border-gray-500 p-4 rounded mb-4 cursor-pointer" onClick={() => fileInputRef.current.click()}>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        {!previewUrl ? (
          <div className="flex flex-col items-center">
            <Upload size={30} className="text-gray-400" />
            <p className="text-sm mt-2">Rasm yuklash uchun bosing</p>
          </div>
        ) : (
          <img src={previewUrl} alt="preview" className="rounded shadow max-w-full h-48 object-contain mx-auto" />
        )}
      </div>
      {qrCodeUrl && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <p className="text-black font-medium mb-2">QR Code natijasi:</p>
          <img src={qrCodeUrl + '?t=' + Date.now()} alt="QR Code" className="max-w-full h-40 mx-auto" />
        </div>
      )}
      <div className="flex gap-3">
        <button disabled={!file || loading} onClick={handleUpload} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50">
          {loading ? 'Yuklanmoqda...' : 'Yuklash'}
        </button>
        <button onClick={clear} className="flex-1 border border-gray-500 text-gray-300 py-2 rounded">
          <X size={16} className="inline" /> Bekor qilish
        </button>
      </div>
    </div>
    </div>

  );
};

export default QRCodeUploader;
