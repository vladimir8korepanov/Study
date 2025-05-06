"use client";

import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./styles/Moderator.module.css";
import { Box, Typography } from "@mui/material";

export default function ModeratorPage() {
  const { isAuthenticated } = useAuth();

  return (
    <Box role="region">
      <NavBar />
      <Box className={styles.container}>
        <Typography variant="h4" gutterBottom>
          Редакторская страница
        </Typography>
        {isAuthenticated ? (
          <ProtectedRoute
            permission={{ action: "write", resource: "posts" }}
            role={["moderator", "admin"]}
            redirectTo="/login"
          >
            <Box>
              <Typography variant="h5" gutterBottom>
                Содержимое редакторской страницы
              </Typography>
              <Typography variant="body1">
                Добро пожаловать на редакторскую панель! Здесь вы можете управлять постами.
              </Typography>
            </Box>
          </ProtectedRoute>
        ) : (
          <Typography variant="body1">
            Пожалуйста, войдите, чтобы получить доступ к редакторской странице.
          </Typography>
        )}
      </Box>
    </Box>
  );
}