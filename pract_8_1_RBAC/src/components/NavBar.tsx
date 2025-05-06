"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import PermissionGuard from "@/components/auth/PermissionGuard";

const NavBar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  console.log("NavBar - isAuthenticated:", isAuthenticated, "User:", user);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        {!isAuthenticated && (
          <Button color="inherit" onClick={() => router.push("/login")}>
            Войти
          </Button>
        )}
        {isAuthenticated && user && (
          <>
            <Button color="inherit" onClick={() => router.push("/")}>
              Главная
            </Button>
            <PermissionGuard permission={{ action: "read", resource: "dashboard" }}>
              <Button color="inherit" onClick={() => router.push("/dashboard")}>
                Панель управления
              </Button>
            </PermissionGuard>
            <PermissionGuard permission={{ action: "write", resource: "posts" }}>
              <Button color="inherit" onClick={() => router.push("/moderator")}>
                Редактор
              </Button>
            </PermissionGuard>
            <PermissionGuard permission={{ action: "write", resource: "admin" }}>
              <Button color="inherit" onClick={() => router.push("/admin")}>
                Админ
              </Button>
            </PermissionGuard>
            <Button color="inherit" onClick={() => router.push("/profile")}>
              Профиль
            </Button>
            <Button color="inherit" onClick={logout}>
              Выход
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;