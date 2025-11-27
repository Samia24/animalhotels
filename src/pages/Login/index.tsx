import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import cachorro2 from '../../assets/cachorro2.png';
import gato2 from '../../assets/gato2.png';

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
    <div className="login-page">
      <div className="login-images">
    <img src={cachorro2} alt="cachorro2" className="login-img" />
    <img src={gato2} alt="gato2" className="login-img" />
  </div>
  <div className="form-card">
    <h2 className="login-title">AnimalHotels</h2>

    <form onSubmit={handleSubmit(handleLogin)} className="form-default">
      <label>E-mail</label>
      <input
        {...register('email')}
        type="email"
        placeholder="admin@animalhotels.com"
        required
      />

      <label>Senha</label>
      <input
        {...register('password')}
        type="password"
        placeholder="******"
        required
      />

      <button type="submit" className="btn btn-primary">
        ENTRAR
      </button>
    </form>
  </div>
</div>

  );
}
