import { useEffect, useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import cachorro2 from '../../assets/cachorro2.png';
import gato2 from '../../assets/gato2.png';

export function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (data: any) => {
    try {
      setError("");
      await signIn(data.nome, data.senha);
      navigate('/dashboard');
    } catch (err) {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-images">
        <img src={cachorro2} alt="cachorro" className="login-img" />
        <img src={gato2} alt="gato" className="login-img" />
      </div>
      <div className="form-card">
        <h2 style={{color: '#333'}}>Animals Hotel</h2>

        <form onSubmit={handleSubmit(handleLogin)} className="form-default">
          <label>Nome de Usuário</label>
          <input
            {...register('nome')}
            type="text"
            placeholder="Ex: Admin"
            required
          />

          <label>Senha</label>
          <input
            {...register('senha')}
            type="password"
            placeholder="******"
            required
          />

          {error && <p className="form-message error">{error}</p>}

          <button type="submit" className="btn btn-primary">
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}