import React, { useState } from 'react';
import Logo from "../assets/logo.png";
import { FaSearch, FaGlobe, FaUniversalAccess, FaCamera, FaBars, FaTimes , FaUpload } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Header = ({ setActiveTab }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = () => {
    alert("Qidiruv ochildi!");
  };

  const handleLanguage = () => {
    alert("Til tanlash oynasi ochildi!");
  };

  const handleAccessibility = () => {
    alert("Imkoniyatlar paneli ochildi!");
  };

  const handleCloseMenu = () => {
    setMenuOpen(false); // tugma bosilganda menyu yopilsin
  };

  return (
    <div className="w-full bg-black backdrop-blur-3xl shadow-md shadow-amber-500">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center px-4 py-3 relative">

        <img src={Logo} alt="Logo" className="w-[120px]" />

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <button onClick={handleSearch} className="text-2xl hover:text-cyan-400 transition duration-300">
              <FaSearch className='text-white' />
            </button>
          </li>
          <li>
            <button onClick={handleLanguage} className="text-2xl hover:text-cyan-400 transition duration-300">
              <FaGlobe className='text-white' />
            </button>
          </li>
          <li>
            <button onClick={handleAccessibility} className="text-2xl hover:text-cyan-400 transition duration-300">
              <FaUniversalAccess className='text-white' />
            </button>
          </li>
          <li>
            <Link to={'qrcode'} onClick={() => setActiveTab('qrcode')} className="flex items-center gap-2 px-4 py-2 text-white border-none  btn bg-green-800 shadow-lg hover:shadow-success transition-all duration-300">
              <FaUpload className="text-[20px]" />
              <span className="ml-2 md:inline hidden">Rasm yuklash</span>
            </Link>
          </li>
          <li>
            <Link to={'/scan'} onClick={() => setActiveTab('scan')} className="flex items-center gap-2 px-4 py-2   btn bg-green-800 text-white border-none hover:shadow-success shadow-lg  transition-all duration-300">
              <FaCamera className="text-[20px]" />
              <span className="ml-2 md:inline hidden">Skaner qilish</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              onClick={() => { setActiveTab('register'); }}
              className="flex items-center gap-2 px-4 py-2   btn bg-green-800 text-white border-none hover:shadow-success shadow-lg  transition-all duration-300"
            >
              <RiLoginBoxFill className="text-[20px]" />
              <span className="ml-2 md:inline hidden">Registratsiya</span>
            </Link>
          </li>
        </ul>

        {/* Mobile */}
        <div onClick={() => setMenuOpen(!menuOpen)} className=" md:hidden text-white text-3xl cursor-pointer transition-all duration-300 z-30">
          {menuOpen ? <FaTimes className="hover:text-cyan-400" /> : <FaBars className="hover:text-cyan-400" />}
        </div>

        <ul className={`absolute z-30 top-[70px] right-4 bg-black p-6 rounded-lg flex flex-col  gap-5 shadow-2xl  w-[140px] items-center transition-all duration-500 ease-in-out transform ${menuOpen ? "scale-100 opacity-100 " : "scale-0 opacity-0"}`}>
          <li>
            <button onClick={() => { handleSearch(); handleCloseMenu(); }} className="text-xl text-white hover:text-cyan-400 transition-all">
              <FaSearch />
            </button>
          </li>
          <li>
            <button onClick={() => { handleLanguage(); handleCloseMenu(); }} className="text-xl text-white hover:text-cyan-400 transition-all">
              <FaGlobe />
            </button>
          </li>
          <li>
            <button onClick={() => { handleAccessibility(); handleCloseMenu(); }} className="text-xl text-white hover:text-cyan-400 transition-all">
              <FaUniversalAccess />
            </button>
          </li>
          <li>
            <button onClick={() => { setActiveTab('qrcode'); handleCloseMenu(); }} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-purple-500 hover:to-blue-600 shadow-lg hover:shadow-cyan-500/50 transition-all">
              <MdOutlineQrCodeScanner className="text-lg" />
            </button>
          </li>
          <li>
            <Link to={'/content'}  onClick={() => { setActiveTab('scan'); handleCloseMenu(); }} className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-purple-500 hover:to-blue-600 shadow-lg hover:shadow-cyan-500/50 transition-all">
              <FaCamera className="text-lg" />
            </Link>
          </li>
          <li>
            <Link
              to=""
              onClick={() => { setActiveTab('register'); handleCloseMenu(); }}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-purple-500 hover:to-blue-600 shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <RiLoginBoxFill className="text-lg" />
            </Link>
          </li>
        </ul>

      </div>
    </div>
  );
};

export default Header;
