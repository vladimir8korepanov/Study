import { useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { ThemeContext, ThemeMode } from './theme-context';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  
  const dynamicTheme = createTheme({
    palette: {
      mode: themeMode,
    },
  });
  
  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={dynamicTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}