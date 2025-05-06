"use client";

import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./styles/Admin.module.css";
import { Box, Typography } from "@mui/material";

export default function AdminPage() {
  const { isAuthenticated } = useAuth();

  return (
    <Box role="region">
      <NavBar />
      <Box className={styles.container}>
        <Typography variant="h4" gutterBottom>
          Админ-панель
        </Typography>
        {isAuthenticated ? (
          <ProtectedRoute
            permission={{ action: "write", resource: "admin" }}
            role="admin"
            redirectTo="/403"
          >
            <Box>
              <Typography variant="h5" gutterBottom>
                Содержимое админ-панели
              </Typography>
              <Typography variant="body1">
                Добро пожаловать в админ-панель! Здесь доступны только администраторы.
              </Typography>
            </Box>
          </ProtectedRoute>
        ) : (
          <Typography variant="body1">
            Пожалуйста, войдите, чтобы получить доступ к админ-панели.
          </Typography>
        )}
      </Box>
    </Box>
  );
}