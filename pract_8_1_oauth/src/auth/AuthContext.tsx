import { createContext } from 'react';

export interface AuthContextType {
  user: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);