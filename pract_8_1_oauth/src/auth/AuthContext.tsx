// import { useContext } from 'react';
// import { AuthContext } from './AuthProvider';

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuthContext must be used within AuthProvider');
//   }
//   return context;
// };
import { createContext } from 'react';

export interface AuthContextType {
  user: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);