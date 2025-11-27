import { Routes, Route, Link } from 'react-router-dom';
import { Login } from '../pages/Login';
import { PrivateRoute } from './PrivateRoute';
import { useAuth } from '../contexts/AuthContext';
import { Tutors } from '../pages/tutores/index';
import { TutorForm } from '../pages/tutores/TutorForm';
import { AnimalForm } from '../pages/animal/animalForm'; 

// ...
export function AppRoutes() {
  const { signOut, user } = useAuth();

  return (
    <Routes>
      {/* Rota Pública */}
      <Route path="/" element={<Login />} />

      {/* Rotas Privadas */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/dashboard"
          element={
            <div className="page-center ">
              <div className="card">
              <h1>Bem-vindo, {user?.name}!</h1>
              <p>O que deseja gerenciar?</p>

              <div className="btn-group-vertical">
                <Link to="/tutors" className="btn btn-green">
                  Gerenciar Tutores
                </Link>

                <Link to="/animals" className="btn btn-gray">
                  Gerenciar Animais
                </Link>
              </div>

              <hr />

              <button className="btn btn-red" onClick={signOut}>
                Sair do Sistema
              </button>
            </div>
          </div>
          }
        />

        {/* Rotas para tutores e animais usando os componentes importados */}
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/tutors/new" element={<TutorForm />} />
        <Route path="/animals" element={<AnimalForm />} />
      </Route>
    </Routes>
  );
}
