import React, { useState, useEffect, useRef } from 'react';
import Logo from "../assets/logo.png";
import {
  FaSearch, FaGlobe, FaUniversalAccess, FaCamera,
  FaBars, FaTimes, FaUpload
} from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = ({ setActiveTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const langRef = useRef();
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) i18n.changeLanguage(savedLang);
  }, [i18n]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLanguageOpen(false);
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setLanguageOpen(false);
  };

  const HoverLink = ({ label }) => (
    <div className="relative hidden md:flex items-center group cursor-pointer">
      <h2 className="font-semibold inline-block relative pb-2 text-[12px] min-w-[100px]">
        {label}
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
      </h2>
    </div>
  );

  const Dropdown = ({ title, items }) => (
    <div className="relative group cursor-pointer">
      <h2 className="inline-block pb-2 group-hover:text-white transition text-sm font-semibold">
        {title}
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
      </h2>
      <div className="absolute top-full mt-2 right-0 w-52 bg-green-900 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 z-[9999]">
        {items.map((item, idx) => (
          <p key={idx} className="block px-4 py-2 hover:bg-green-600 text-sm font-semibold">{item}</p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-black text-white shadow-md relative z-[1000]">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center px-4 py-3 relative">
        <div className="flex items-center gap-3">
          <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </div>
          <Link to="/">
            <img src={Logo} alt="Logo" className='w-[120px] h-auto' />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-x-2 text-white text-sm font-semibold flex-wrap px-2 max-w-[900px]">
          <Dropdown title={t("about_ministry")} items={[t("about_ministry"), t("tasks_ministry"), t("leaders"), t("reports")]} />
          <Dropdown title={t("hajj_umrah")} items={[t("hajj"), t("umrah")]} />
          <Dropdown title={t("mekkah_madinnah")} items={[t("mekkah"), t("madinnah")]} />
          <HoverLink label={t("e_services")} />
          <Dropdown title={t("media_awareness")} items={[t("media_awareness"), t("minister_activities"), t("ministry_news"), t("great_hajj_symposium"), t("awareness_guides"), t("initiatives"), t("document_library"), t("awareness_platform"), t("pilgrim_dictionary")]} />
          <Dropdown title={t("data_availability")} items={[t("freedom_info"), t("data_sharing"), t("open_data")]} />
          <HoverLink label={t("contact_us")} />
          <div className="relative hidden md:flex items-center ml-2 group cursor-pointer">
            <h2 className="font-semibold inline-block relative pb-2 text-[12px] min-w-[100px] bg-white text-green-700 rounded-lg py-1 px-2 animate-pulse">
              جائزة باحثون في خدمة ضيوف الرحمن
            </h2>
          </div>
          <HoverLink label={t("nusuk_platform")} />
        </div>

        <ul className="flex items-center gap-4 text-white">
          <li className="flex items-center"><FaSearch className="text-xl cursor-pointer hover:text-white" /></li>
          <li className="flex items-center"><FaUniversalAccess className="text-xl cursor-pointer hover:text-white" /></li>
          <li ref={langRef} className="relative flex items-center">
            <button onClick={() => setLanguageOpen(!languageOpen)} className="inline-flex items-center justify-center text-xl hover:text-white">
              <FaGlobe />
            </button>
            {languageOpen && (
              <div className="absolute top-10 right-0 bg-green-900 text-white rounded shadow-lg py-2 w-32 z-[9999]">
                <button onClick={() => changeLanguage('uz')} className="w-full px-4 py-2 hover:bg-green-600 flex gap-2">🇺🇿 O‘zbek</button>
                <button onClick={() => changeLanguage('ru')} className="w-full px-4 py-2 hover:bg-green-600 flex gap-2">🇷🇺 Русский</button>
                <button onClick={() => changeLanguage('en')} className="w-full px-4 py-2 hover:bg-green-600 flex gap-2">🇬🇧 English</button>
                <button onClick={() => changeLanguage('ar')} className="w-full px-4 py-2 hover:bg-green-600 flex gap-2">🇸🇦 العربية</button>
              </div>
            )}
          </li>
          <li ref={dropdownRef} className="relative flex items-center">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 px-3 py-1 text-white font-bold bg-green-800 rounded-md hover:bg-green-600 text-sm">
              {t("services")}
            </button>
            <div className={`absolute top-full mt-2 right-0 w-48 bg-green-900 rounded-md shadow-lg transform origin-top duration-300 z-[9999] ${dropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
              <Link to="/qrcode" onClick={() => { setActiveTab('qrcode'); setDropdownOpen(false); }} className="flex items-center gap-2 px-4 py-3 text-white hover:bg-green-700"><FaUpload /> {t("upload_image")}</Link>
              <Link to="/scan" onClick={() => { setActiveTab('scan'); setDropdownOpen(false); }} className="flex items-center gap-2 px-4 py-3 text-white hover:bg-green-700"><FaCamera /> {t("scan_qr")}</Link>
              <Link to="/register" onClick={() => { setActiveTab('register'); setDropdownOpen(false); }} className="flex items-center gap-2 px-4 py-3 text-white hover:bg-green-700"><RiLoginBoxFill /> {t("registration")}</Link>
              {isAuthenticated && (
                <button onClick={() => { localStorage.removeItem('isAuthenticated'); navigate('/login'); }} className="flex items-center gap-2 w-full text-left px-4 py-3 text-white hover:bg-red-600">🚪 {t("logout")}</button>
              )}
            </div>
          </li>
        </ul>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-[998]" onClick={() => setSidebarOpen(false)}></div>}

      <div className={`fixed top-0 left-0 h-full w-[270px] bg-white z-[999] p-5 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-green-800">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}><FaTimes className="text-xl text-green-800" /></button>
        </div>
        <ul className="flex flex-col gap-4 text-[15px] font-semibold text-green-900">
          <li>{t("about_ministry")}</li>
          <li>{t("hajj")} / {t("umrah")}</li>
          <li>{t("mekkah")} / {t("madinnah")}</li>
          <li>{t("e_services")}</li>
          <li>{t("media_awareness")}</li>
          <li>{t("data_availability")}</li>
          <li>{t("contact_us")}</li>
          <li className="bg-green-700 text-white py-2 px-3 text-sm rounded-md">جائزة باحثون في خدمة ضيوف الرحمن</li>
          <li>{t("nusuk_platform")}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;