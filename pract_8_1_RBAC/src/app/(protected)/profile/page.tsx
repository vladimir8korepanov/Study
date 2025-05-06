"use client";

import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./styles/Profile.module.css";
import { Box, Typography } from "@mui/material";

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Box role="region">
      <NavBar />
      <Box className={styles.container}>
        <Typography variant="h4" gutterBottom>
          Профиль
        </Typography>
        {isAuthenticated ? (
          <ProtectedRoute redirectTo="/login">
            <Box>
              <Typography variant="h5" gutterBottom>
                Информация о профиле
              </Typography>
              <Typography variant="body1">
                Имя: {user?.name || "Неизвестно"}
              </Typography>
              <Typography variant="body1">
                Email: {user?.email || "Н/Д"}
              </Typography>
              <Typography variant="body1">
                Роль: {user?.role || "Н/Д"}
              </Typography>
            </Box>
          </ProtectedRoute>
        ) : (
          <Typography variant="body1">
            Пожалуйста, войдите, чтобы просмотреть свой профиль.
          </Typography>
        )}
      </Box>
    </Box>
  );
}