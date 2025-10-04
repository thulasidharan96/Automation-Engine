import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAutomationStudio } from '../state/store';

export default function RequireAuth() {
  const isAuthenticated = useAutomationStudio((s) => s.isAuthenticated);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
