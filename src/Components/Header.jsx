import React, { useState } from 'react';
import Logo from "../assets/logo.png";
import { FaSearch, FaGlobe, FaUniversalAccess, FaCamera, FaBars, FaTimes, FaUpload } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = ({ setActiveTab }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguageMenu = () => {
    setLanguageOpen(!languageOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // <-- i18next orqali til o'zgaradi
    setLanguageOpen(false);   // Til tanlanganda menyu yopiladi
  };

  const handleSearch = () => {
    alert(t('search_open'));
  };

  const handleAccessibility = () => {
    alert(t('accessibility_open'));
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
    setLanguageOpen(false);
  };

  return (
    <div className="w-full  backdrop-blur-3xl shadow-md shadow-amber-500 relative">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center px-4 py-3 relative">
        {/* Logo */}
        <Link to={'/'}>
          <img src={Logo} alt="Logo" className="w-[120px]" />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-6 relative">
          <li>
            <button onClick={handleSearch} className="text-2xl hover:text-cyan-400 transition">
              <FaSearch className="text-white" />
            </button>
          </li>

          {/* Language Switcher */}
          <li className="relative">
            <button onClick={toggleLanguageMenu} className="text-2xl hover:text-cyan-400 transition">
              <FaGlobe className="text-white" />
            </button>

            {/* Dropdown */}
            {languageOpen && (
              <div className="absolute top-10 right-0 bg-white text-black rounded shadow-lg py-2 w-32 z-50">
                <button
                  onClick={() => changeLanguage('uz')}
                  className="w-full px-4 py-2 hover:bg-gray-200 flex items-center gap-2"
                >
                  🇺🇿 <span>O'zbek</span>
                </button>
                <button
                  onClick={() => changeLanguage('ru')}
                  className="w-full px-4 py-2 hover:bg-gray-200 flex items-center gap-2"
                >
                  🇷🇺 <span>Русский</span>
                </button>
              </div>
            )}
          </li>

          <li>
            <button onClick={handleAccessibility} className="text-2xl hover:text-cyan-400 transition">
              <FaUniversalAccess className="text-white" />
            </button>
          </li>

          <li>
            <Link to={'/qrcode'} onClick={() => setActiveTab('qrcode')} className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded shadow hover:shadow-lg transition">
              <FaUpload className="text-[20px]" />
              <span>{t("upload_image")}</span>
            </Link>
          </li>

          <li>
            <Link to={'/scan'} onClick={() => setActiveTab('scan')} className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded shadow hover:shadow-lg transition">
              <MdOutlineQrCodeScanner className="text-[20px]" />
              <span>{t("scan_qr")}</span>
            </Link>
          </li>

          <li>
            <Link to={'/register'} onClick={() => setActiveTab('register')} className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white rounded shadow hover:shadow-lg transition">
              <RiLoginBoxFill className="text-[20px]" />
              <span>{t("registration")}</span>
            </Link>
          </li>
        </ul>

        {/* Mobile menu icon */}
        <div onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-3xl cursor-pointer transition">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile menu */}
        <ul className={`absolute z-30 top-[70px] right-4 bg-black p-6 rounded-lg flex flex-col gap-5 shadow-2xl w-[140px] items-center transition-all duration-500 ease-in-out transform ${menuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
          <li>
            <button onClick={() => { handleSearch(); handleCloseMenu(); }} className="text-white text-2xl">
              <FaSearch />
            </button>
          </li>
          <li>
            <button onClick={() => { toggleLanguageMenu(); handleCloseMenu(); }} className="text-white text-2xl">
              <FaGlobe />
            </button>
          </li>
          <li>
            <button onClick={() => { handleAccessibility(); handleCloseMenu(); }} className="text-white text-2xl">
              <FaUniversalAccess />
            </button>
          </li>
          <li>
            <Link to={'/qrcode'} onClick={() => { setActiveTab('qrcode'); handleCloseMenu(); }}>
              <FaUpload />
            </Link>
          </li>
          <li>
            <Link to={'/scan'} onClick={() => { setActiveTab('scan'); handleCloseMenu(); }}>
              <FaCamera className="text-lg" />
            </Link>
          </li>
          <li>
            <Link to={'/register'} onClick={() => { setActiveTab('register'); handleCloseMenu(); }}>
              <RiLoginBoxFill className="text-lg" />
            </Link>
          </li>
        </ul>

      </div>
    </div>
  );
};

export default Header;
