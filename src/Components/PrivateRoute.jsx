// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  
  // Agar foydalanuvchi tizimga kirgan bo'lsa, children ni ko'rsatadi (ya'ni, sahifani).
  // Aks holda, login sahifasiga yo'naltiradi.
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
