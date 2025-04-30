import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const RegisterScreen = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setStatus(null);
    }
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !file) {
      setStatus({ type: 'error', message: 'Iltimos, barcha majburiy maydonlarni to‘ldiring.' });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    if (middleName) formData.append('middle_name', middleName);
    formData.append('file', file);

    try {
      const res = await fetch("https://qr.abdugafforov.uz/register/", {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      const data = await res.json();

      if (res.ok && data?.qr_code_url) {
        setStatus({ type: "success", message: t("success_register") || "Registratsiya muvaffaqiyatli!" });
      } else {
        setStatus({ type: "error", message: data.message || "Xatolik yuz berdi." });
      }

    } catch (err) {
      setStatus({ type: "error", message: t("error_register") || "Tizimda xatolik yuz berdi." });
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setFile(null);
    setPreviewUrl('');
    setStatus(null);
    setFirstName('');
    setLastName('');
    setMiddleName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-black rounded-3xl overflow-hidden text-center p-4 w-full max-w-sm mx-auto min-h-[500px] shadow-lg text-white">
      <h2 className="text-lg font-semibold mb-4">{t('register_title') || "QR orqali ro‘yxatdan o‘tish"}</h2>

      <div className="space-y-3 mb-4 text-left">
        <input
          type="text"
          placeholder="Ism *"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded outline-none border border-gray-600 focus:border-green-500"
        />
        <input
          type="text"
          placeholder="Familiya *"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded outline-none border border-gray-600 focus:border-green-500"
        />
        <input
          type="text"
          placeholder="Otasining ismi (ixtiyoriy)"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded outline-none border border-gray-600 focus:border-green-500"
        />
      </div>

      <div
        className="border border-dashed border-gray-600 p-4 rounded mb-4 cursor-pointer"
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
          <div className="flex flex-col items-center text-gray-400">
            <Upload size={28} />
            <p className="text-sm mt-2">{t('click_to_upload') || "Rasm tanlang"}</p>
          </div>
        ) : (
          <img src={previewUrl} alt="preview" className="h-48 mx-auto object-contain rounded" />
        )}
      </div>

      <div className="flex gap-3 mb-3">
        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-50 transition-all"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              {t("uploading") || "Yuborilmoqda..."}
            </div>
          ) : (
            t("upload") || "Yuborish"
          )}
        </button>
        <button
          onClick={clear}
          className="flex-1 border border-gray-500 text-gray-300 py-2 rounded hover:border-white transition-all"
        >
          <X size={16} className="inline mr-1" /> {t('cancel') || "Bekor qilish"}
        </button>
      </div>

      {status && (
        <p className={`text-sm mt-2 ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>
          {status.message}
        </p>
      )}
    </div>
  );
};

export default RegisterScreen;
