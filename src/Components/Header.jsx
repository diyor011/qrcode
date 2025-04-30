import React, { useState, useEffect, useRef } from 'react';
import Logo from "../assets/logo.png";
import { FaSearch, FaGlobe, FaUniversalAccess, FaCamera, FaBars, FaTimes, FaUpload } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = ({ setActiveTab }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const langRef = useRef();
  const dropdownRef = useRef();

  // LocalStorage orqali tilni o'qish
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  // Tashqariga bosilganda dropdownlar yopilsin
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLanguageOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLanguageMenu = () => {
    setLanguageOpen(!languageOpen);
  };

  const toggleMobileLanguageMenu = () => {
    setMobileLangOpen(!mobileLangOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setLanguageOpen(false);
    setMobileLangOpen(false); // ❗ faqat language dropdownni yopamiz
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
    setLanguageOpen(false);
    setDropdownOpen(false);
    setMobileLangOpen(false);
  };

  return (
    <div className="w-full backdrop-blur-3xl shadow-md shadow-green-700 relative z-[1000]">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center px-4 py-3 relative">

        {/* Logo */}
        <Link to={'/'}>
          <img src={Logo} alt="Logo" className="w-[120px]" />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-6 relative">
          {/* Language Switcher */}
          <li className="relative" ref={langRef}>
            <button onClick={toggleLanguageMenu} className="text-2xl hover:text-green-700 transition">
              <FaGlobe className="text-white hover:text-green-700" />
            </button>

            {languageOpen && (
              <div className="absolute top-10 right-0 bg-black text-white rounded shadow-green-700 shadow-lg py-2 w-32 z-[9999]">
                <button onClick={() => changeLanguage('uz')} className="w-full px-4 py-2 hover:bg-green-700 flex items-center gap-2">
                  🇺🇿 <span>O'zbek</span>
                </button>
                <button onClick={() => changeLanguage('ru')} className="w-full px-4 py-2 hover:bg-green-700 flex items-center gap-2">
                  🇷🇺 <span>Русский</span>
                </button>
              </div>
            )}
          </li>

          {/* Search */}
          <li>
            <button className="text-2xl transition">
              <FaSearch className="text-white hover:text-green-700" />
            </button>
          </li>

          {/* Accessibility */}
          <li>
            <button className="text-2xl transition">
              <FaUniversalAccess className="text-white hover:text-green-700" />
            </button>
          </li>

          {/* Services Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 text-white font-bold bg-green-800 rounded-md hover:bg-green-700 transition-all"
            >
              {t('services')}
            </button>

            <div className={`absolute top-full mt-2 right-0 w-48 bg-black rounded-md shadow-lg overflow-hidden transform origin-top transition-all duration-300 ease-in-out z-[9999] ${dropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
              <Link to="/qrcode" onClick={() => { setActiveTab('qrcode'); setDropdownOpen(false); }} className="flex items-center gap-2 px-4 py-3 text-white hover:bg-green-700">
                <FaUpload />
                <span>{t('upload_image')}</span>
              </Link>
              <Link to="/scan" onClick={() => { setActiveTab('scan'); setDropdownOpen(false); }} className="flex items-center gap-2 px-4 py-3 text-white hover:bg-green-700">
                <FaCamera />
                <span>{t('scan_qr')}</span>
              </Link>
              <Link to="/register" onClick={() => { setActiveTab('register'); setDropdownOpen(false); }} className="flex items-center gap-2 px-4 py-3 text-white hover:bg-green-700">
                <RiLoginBoxFill />
                <span>{t('registration')}</span>
              </Link>
            </div>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <div onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-3xl cursor-pointer transition-all z-[9999]">
          {menuOpen ? <FaTimes className="hover:text-green-700" /> : <FaBars className="hover:text-green-800" />}
        </div>

        {/* Mobile menu */}
        <ul className={`absolute top-[70px] right-4 bg-black p-6 rounded-lg flex flex-col gap-5 shadow-2xl w-[180px] items-center transition-all duration-500 ease-in-out transform ${menuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"} z-[9999]`}>
          <li>
            <button className="text-white text-2xl" onClick={handleCloseMenu}>
              <FaSearch />
            </button>
          </li>

          {/* Mobile Language Switcher */}
          <li className="relative">
            <button className="text-white text-2xl" onClick={toggleMobileLanguageMenu}>
              <FaGlobe />
            </button>

            {mobileLangOpen && (
              <div className="absolute top-10 right-0 bg-black text-white rounded shadow-lg py-2 w-28 z-[9999]">
                <button onClick={() => changeLanguage('uz')} className="w-full px-2 py-2 hover:bg-green-700 flex items-center gap-2 text-sm">
                  🇺🇿 O'zbek
                </button>
                <button onClick={() => changeLanguage('ru')} className="w-full px-2 py-2 hover:bg-green-700 flex items-center gap-2 text-sm">
                  🇷🇺 Русский
                </button>
              </div>
            )}
          </li>

          <li>
            <button className="text-white text-2xl" onClick={handleCloseMenu}>
              <FaUniversalAccess />
            </button>
          </li>
          <li>
            <Link to="/qrcode" onClick={() => { setActiveTab('qrcode'); handleCloseMenu(); }}>
              <FaUpload />
            </Link>
          </li>
          <li>
            <Link to="/scan" onClick={() => { setActiveTab('scan'); handleCloseMenu(); }}>
              <FaCamera className="text-lg" />
            </Link>
          </li>
          <li>
            <Link to="/register" onClick={() => { setActiveTab('register'); handleCloseMenu(); }}>
              <RiLoginBoxFill className="text-lg" />
            </Link>
          </li>
        </ul>

      </div>
    </div>
  );
};

export default Header;
