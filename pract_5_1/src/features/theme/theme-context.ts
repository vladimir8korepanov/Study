import { createContext, useContext } from 'react';
import { createTheme } from '@mui/material';

export type ThemeMode = 'light' | 'dark';


export const ThemeContext = createContext({
  themeMode: 'light' as ThemeMode,
  toggleTheme: () => {},
});

export const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const useThemeContext = () => useContext(ThemeContext);