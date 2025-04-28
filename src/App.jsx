import { useState } from 'react';
import Header from './Components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import HeroBanner from './Components/HeroBanner';

const App = () => {
  const [activeTab, setActiveTab] = useState('qrcode');
  const location = useLocation()
  return (
    <div className="flex flex-col min-h-screen bg-slate-800 text-white">
      <Header setActiveTab={setActiveTab} />
      <Outlet />
      {location.pathname === '/' && <HeroBanner /> }
    </div>
  );
};

export default App;
