import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useMeQuery } from '../store/api/auth';
import { useAppSelector } from '../store/hooks';


export function AuthGuard() {
  const location = useLocation();
  const { user: currentUser } = useAppSelector((state) => state.auth);
  
  // Skip useMeQuery if user is explicitly null (logged out)
  const { isLoading, isError } = useMeQuery(undefined, {
    skip: currentUser === null
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (isError || !currentUser) {
    // Save the attempted location for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected route
  return <Outlet />;
}