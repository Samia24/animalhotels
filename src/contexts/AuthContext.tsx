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
  signIn: (userData: IUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem('animalHotels:user');
    const storedToken = localStorage.getItem('animalHotels:token');

    if (storedUser && storedToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
    }
  }, []);

  const signIn = (userData: IUser) => {
    localStorage.setItem('animalHotels:user', JSON.stringify(userData));
    localStorage.setItem('animalHotels:token', userData.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const signOut = () => {
    localStorage.removeItem('animalHotels:user');
    localStorage.removeItem('animalHotels:token');
    delete api.defaults.headers.common['Authorization'];
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