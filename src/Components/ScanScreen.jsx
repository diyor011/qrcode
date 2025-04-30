import { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ScanScreen = () => {
  const { t } = useTranslation();
  const [result, setResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScanning = async () => {
    try {
      const scanner = new Html5Qrcode('qr-reader-box');
      const devices = await Html5Qrcode.getCameras();
      if (devices.length) {
        const cameraId = devices[1].id;
        await scanner.start(
          cameraId,
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            setResult(decodedText);
            scanner.stop();
            setIsScanning(false);
          },
          (error) => {
            console.warn('QR xatosi:', error);
          }
        );
        setIsScanning(true);
      }
    } catch (error) {
      console.error('Kamera topilmadi:', error);
    }
  };

  return (
    <div className="bg-black rounded-3xl overflow-hidden text-center p-4">
      <div className="flex justify-end p-2">
        <button className="text-gray-400">
          <Camera size={20} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-2 max-w-[250px]  mx-auto">{t('scan_title')}</p>
        <div className="bg-gray-900 p-4 rounded-lg mb-6 relative">
          <div id="qr-reader-box" className="w-full aspect-square flex items-center justify-center" />
        </div>
        {result && (
          <div className="bg-gray-800 p-3 rounded-md text-white">
            <p className="text-green-400 mb-2">{t('scanned_result')}:</p>
            {result.startsWith('http') && /\.(png|jpg|jpeg|webp)$/i.test(result) ? (
              <img src={result} alt="QR Code natijasi" className="rounded mt-2 max-w-full mx-auto" />
            ) : (
              <img src={result} alt="" />
            )}
          </div>
        )}
        <p className="text-xs text-gray-400 mt-6 max-w-[250px]">{t('position_qr')}</p>
      </div>
      <div className="flex justify-center gap-4 p-2">
        {!isScanning && (
          <button
            onClick={startScanning}
            className="bg-green-800 text-white px-4 py-2 rounded-md text-sm  shadow-md shadow-success  hover:bg-green-700 hover:shadow-lg   transition-all"
          >
            {t('scan_qr')}
          </button>
        )}
        <Link to={'/'} className="bg-transparent border border-gray-600 text-gray-400 px-4 py-2 rounded-md text-sm hover:border-gray-400 transition-all">
          {t('cancel')}
        </Link>
      </div>
    </div>
  );
};

export default ScanScreen;
