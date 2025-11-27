import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  // Se estiver autenticado, renderiza a rota filha (Outlet). Se não, chuta pro Login.
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}