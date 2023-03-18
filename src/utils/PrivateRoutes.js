import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../components/context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to='/kanban' />;
  }
  return children;
};

export default ProtectedRoute;
