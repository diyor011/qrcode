import { useState, useRef } from 'react';
import { Upload, X, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QRCodeUploader = () => {
  const { t } = useTranslation();
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
      setQrCodeUrl('');
      toast.info(t('select_image') || 'Rasm tanlandi');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error(t('error_required_fields') || 'Rasm tanlanmagan');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('https://qr.abdugafforov.uz/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        toast.error(t('error_register') || 'Serverdan noto‘g‘ri javob keldi');
        throw new Error('Serverdan noto‘g‘ri javob keldi');
      }

      const data = await res.json();

      if (data?.qr_code_url) {
        const fullUrl = `https://qr.abdugafforov.uz${data.qr_code_url}`;
        setQrCodeUrl(fullUrl);
        toast.success(t('success_register') || 'QR kod muvaffaqiyatli yaratildi!');
      } else {
        toast.error(t('error_register') || 'QR kod yaratilishda xatolik yuz berdi');
      }
    } catch (err) {
      console.error('Yuklashda xatolik:', err);
      toast.error(t('error_register') || 'Tizimda xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQRCode = async () => {
    if (!qrCodeUrl) return;

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(t('transfer_qr') || 'QR kod fayl sifatida yuklab olindi!');
    } catch (err) {
      console.error("Yuklab olishda xatolik:", err);
      toast.error('QR kodni yuklab olishda xatolik yuz berdi.');
    }
  };

  const clear = () => {
    setFile(null);
    setPreviewUrl('');
    setQrCodeUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast.info(t('cancel') || 'Tozalandi');
  };

  return (
    <>
      <div className="bg-black rounded-3xl overflow-hidden py-6 max-w-xs w-full shadow-lg">
        <div className="text-center text-white">
          <h2 className="text-lg font-semibold mb-4">
            {t('upload_title') || 'Rasm yuklash'}
          </h2>

          {/* File Upload */}
          <div
            className="border border-dashed border-gray-500 p-4 rounded mb-4 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {!previewUrl ? (
              <div className="flex flex-col items-center">
                <Upload size={30} className="text-gray-400" />
                <p className="text-sm mt-2">{t('click_to_upload') || 'Rasm tanlash uchun bosing'}</p>
              </div>
            ) : (
              <img
                src={previewUrl}
                alt="preview"
                className="rounded shadow max-w-full h-48 object-contain mx-auto"
              />
            )}
          </div>

          {/* QR Code preview */}
          {loading ? (
            <div className="bg-gray-700 animate-pulse p-4 rounded shadow mb-4">
              <div className="bg-gray-600 w-full h-40 rounded"></div>
            </div>
          ) : qrCodeUrl && (
            <div className="bg-white p-4 rounded shadow mb-4">
              <p className="text-black font-medium mb-2">
                {t('scanned_result') || 'QR natijasi'}:
              </p>
              <img
                src={qrCodeUrl + '?t=' + Date.now()}
                alt="QR Code"
                className="max-w-full h-40 mx-auto"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            {!qrCodeUrl ? (
              <button
                disabled={!file || loading}
                onClick={handleUpload}
                className="flex-1 bg-green-800 hover:bg-green-700 text-white py-2 rounded disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    {t('uploading') || 'Yuklanmoqda'}
                  </div>
                ) : (
                  t('upload') || 'Yuborish'
                )}
              </button>
            ) : (
              <button
                onClick={handleDownloadQRCode}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-all"
              >
                <Download className="inline mr-2" size={18} /> {t('transfer_qr') || 'QR-ni yuklab olish'}
              </button>
            )}

            <button
              onClick={clear}
              className="flex-1 border border-gray-500 text-gray-300 py-2 rounded hover:border-white transition-all"
            >
              <X size={16} className="inline" /> {t('cancel') || 'Bekor qilish'}
            </button>
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} pauseOnHover />
    </>
  );
};

export default QRCodeUploader;
