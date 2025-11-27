import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (data: any) => {
    if (data.email) {
      signIn({
        id: '1',
        name: 'Admin',
        email: data.email,
        token: 'jwt-token-fake'
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2 className="login-title">AnimalHotels</h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-group">
            <label>E-mail</label>
            <input
              {...register('email')}
              type="email"
              placeholder="admin@animalhotels.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              {...register('password')}
              type="password"
              placeholder="******"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}
