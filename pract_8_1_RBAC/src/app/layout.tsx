"use client";

import "@/styles/globals.css";
import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Исправлено: Корректный импорт
import { AuthProvider } from "@/providers/AuthProvider";
import { RBACProvider } from "@/providers/RBACProvider";
import "@fontsource/inter";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <RBACProvider>{children}</RBACProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
