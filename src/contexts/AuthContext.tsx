import { createContext, useReducer, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { IUser } from '../types';
import { api } from '../services/api';

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
}

type AuthAction = 
  | { type: 'LOGIN'; payload: IUser }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  signIn: (nome: string, senha: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem('animalHotels:user');
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
    }
  }, []);

  const signIn = async (nome: string, senha: string) => {
    try {
      // Busca usuário pelo nome no backend
      const response = await api.get(`/users/name/${nome}`);
      const user = response.data;

      // Verificação simples de senha
      // Nota: Em produção, isso deve ser feito no backend com hash/bcrypt
      if (user && user.senha === senha) {
        const userData: IUser = { id: user.id, nome: user.nome };
        
        localStorage.setItem('animalHotels:user', JSON.stringify(userData));
        dispatch({ type: 'LOGIN', payload: userData });
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem('animalHotels:user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};