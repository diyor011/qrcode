import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Content from './Components/Content.jsx';
import QRCodeUploader from './Components/QRCodeUploader.jsx';
import ScanScreen from './Components/ScanScreen.jsx';
import RegisterScreen from './Components/RegisterScreen.jsx';
import './I18n.js'; // <-- MUHIM! Bu qator kerak

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Content />,
        children: [
          { path: 'qrcode', element: <QRCodeUploader /> },
          { path: 'scan', element: <ScanScreen /> },
          { path: 'register', element: <RegisterScreen /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
