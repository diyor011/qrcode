import { useState, useRef } from 'react';
import { Upload, X, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

      if (!res.ok) {
        throw new Error('Serverdan noto‘g‘ri javob keldi');
      }

      const data = await res.json();
      setQrCodeUrl(`https://qr.abdugafforov.uz${data.qr_code_url}`);
    } catch (err) {
      console.error("Yuklashda xatolik:", err);
      alert("Rasm yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQRCode = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.setAttribute('download', `qr-code-${Date.now()}.png`);
    link.setAttribute('type', 'image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <h2 className="text-lg font-semibold mb-4">{t('upload_title') || 'Rasm yuklash'}</h2>

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
              className="flex-1 bg-green-800 shadow-md hover:bg-green-700 text-white py-2 rounded disabled:opacity-50 transition-all"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  {t('uploading') || 'Yuklanmoqda'}
                </div>
              ) : (
                t('upload') || 'Yuklash'
              )}
            </button>
          ) : (
            <button
              onClick={handleDownloadQRCode}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-all"
            >
              <Download className="inline mr-2" size={18} /> {t('transfer_qr') }
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
  );
};

export default QRCodeUploader;
