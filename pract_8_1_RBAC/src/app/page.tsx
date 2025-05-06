"use client";

import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./styles/Home.module.css";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated, user, hasPermission } = useAuth();
  const router = useRouter();

  console.log("Home - isAuthenticated:", isAuthenticated, "User:", user);

  return (
    <Box role="region">
      <NavBar />
      <Box className={styles.container}>
        <Typography variant="h4" gutterBottom>
          Добро пожаловать
        </Typography>
        <Typography variant="body1" gutterBottom>
          Это общедоступная домашняя страница. Войдите в систему, чтобы получить доступ к защищённому контенту.
        </Typography>
        {!isAuthenticated && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/login")}
            sx={{ mt: 2 }}
          >
            Войти
          </Button>
        )}
        {isAuthenticated && user && (
          <>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h5" gutterBottom>
                Ваш профиль
              </Typography>
              <Typography variant="body1">
                Имя: {user.name || "Неизвестно"}, Роль: {user.role}
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Ваши возможности:
              </Typography>
              {user.role === "admin" && hasPermission({ action: "write", resource: "admin" }) && (
                <Typography variant="body2">
                  - Полный доступ: чтение и запись на панели управления, создание и удаление постов, доступ к админ-панели.
                </Typography>
              )}
              {user.role === "moderator" && hasPermission({ action: "write", resource: "posts" }) && (
                <Typography variant="body2">
                  - Чтение панели управления, запись и создание постов.
                </Typography>
              )}
              {user.role === "user" && hasPermission({ action: "read", resource: "dashboard" }) && (
                <Typography variant="body2">
                  - Чтение панели управления и постов.
                </Typography>
              )}
            </Box>
            {(user.role === "admin" || user.role === "moderator") && (
              <ProtectedRoute
                permission={{ action: "read", resource: "dashboard" }}
                role={["admin", "moderator"]}
                redirectTo="/403"
              >
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Защищённое содержимое панели управления
                  </Typography>
                  <Typography variant="body1">
                    Это содержимое доступно только авторизованным пользователям с ролью администратора или модератора.
                  </Typography>
                </Box>
              </ProtectedRoute>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}