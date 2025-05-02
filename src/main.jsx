import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Content from './Components/Content.jsx';
import QRCodeUploader from './Components/QRCodeUploader.jsx';
import ScanScreen from './Components/ScanScreen.jsx';
import RegisterScreen from './Components/RegisterScreen.jsx';
import './I18n.js';
import Badge from './Components/Badge.jsx';
import LoginPage from './pages/Loginpages.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Content />,
        children: [
          {
            path: 'qrcode',
            element: (
              <PrivateRoute>
                <QRCodeUploader />
              </PrivateRoute>
            ),
          },
          {
            path: 'scan',
            element: (
              <PrivateRoute>
                <ScanScreen />
              </PrivateRoute>
            ),
          },
          {
            path: 'register',
            element: (
              <PrivateRoute>
                <Badge />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
