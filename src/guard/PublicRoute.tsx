import { Navigate, Outlet } from 'react-router-dom';
import { useMeQuery } from '../store/api/auth';

export function PublicRoute() {
  const { data: user, isLoading } = useMeQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // If user is authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is not authenticated, render the public route
  return <Outlet />;
}