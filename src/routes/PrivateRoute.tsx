import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PrivateRoute() {
  const { isAuthenticated, user, signOut } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header className="app-header">
        <div style={{fontWeight: 'bold', fontSize: '1.2rem'}}>AnimalHotels</div>
        
        <div className="header-user-info">
          <span className="user-name">Olá, {user?.nome}</span>
          <button onClick={signOut} className="btn-logout">
            Sair
          </button>
        </div>
      </header>

      {/*Renderização das páginas (Dashboard, Tutores, etc)*/}
      <Outlet />
    </>
  );
}