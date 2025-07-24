import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { PublicRoute } from '../guard/PublicRoute';
import { AuthGuard } from '../guard/AuthGuard';

const LoginPage = lazy(() => import('../pages/Login'));
const RegisterPage = lazy(() => import('../pages/Register'));
const DashboardPage = lazy(() => import('../pages/Dashboard'));
const StandupsPage = lazy(() => import('../pages/Standups'));
const ProfilePage = lazy(() => import('../pages/Profile'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    // Public routes
    element: <PublicRoute />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    // Protected routes
    element: <AuthGuard />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'standups',
        element: <StandupsPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);