import { Routes, Route, Link } from 'react-router-dom';
import { Login } from '../pages/Login';
import { PrivateRoute } from './PrivateRoute';
import { useAuth } from '../contexts/AuthContext';
import { Tutors } from '../pages/tutores/index';
import { TutorForm } from '../pages/tutores/TutorForm';
import { AnimalForm } from '../pages/animal/animalForm'; 
import { AnimalList } from '../pages/animal/AnimalList';
import { UserList } from '../pages/usuarios/index';
import { UserForm } from '../pages/usuarios/UserForm';

export function AppRoutes() {
  const { user } = useAuth(); 

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route
          path="/dashboard"
          element={
            <div className="page-center">
              <div className="card">
                <h1>Painel de Controle</h1>
                <p style={{textAlign: 'center', marginBottom: '20px', color: 'var(--text-muted)'}}>
                  Bem-vindo de volta, <strong>{user?.nome}</strong>!
                </p>

                <div className="btn-group-vertical">
                  <Link to="/tutors" className="btn btn-green">
                    Gerenciar Tutores
                  </Link>

                  <Link to="/animals/list" className="btn btn-gray">
                    Gerenciar Animais
                  </Link>

                  <Link to="/users" className="btn btn-blue">
                    Gerenciar Usuários
                  </Link>
                </div>
              </div>
            </div>
          }
        />
        
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/tutors/new" element={<TutorForm />} />
        <Route path="/tutors/edit/:id" element={<TutorForm />} />

        <Route path="/animals/list" element={<AnimalList />} />
        <Route path="/animals/new" element={<AnimalForm />} />
        <Route path="/animals/edit/:id" element={<AnimalForm />} />

        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
      </Route>
    </Routes>
  );
}