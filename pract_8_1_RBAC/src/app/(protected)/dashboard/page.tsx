"use client";

import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./styles/Dashboard.module.css";
import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();

  return (
    <Box role="region">
      <NavBar />
      <Box className={styles.container}>
        <Typography variant="h4" gutterBottom>
          Информационная панель
        </Typography>
        {isAuthenticated ? (
          <ProtectedRoute
            permission={{ action: "read", resource: "dashboard" }}
            role={["admin", "moderator"]}
            redirectTo="/login"
          >
            <Box>
              <Typography variant="h5" gutterBottom>
                Содержимое информационной панели
              </Typography>
              <Typography variant="body1">
                Добро пожаловать на панель управления администратора / модератора!
              </Typography>
            </Box>
          </ProtectedRoute>
        ) : (
          <Typography variant="body1">
            Please log in to access the dashboard.
          </Typography>
        )}
      </Box>
    </Box>
  );
}