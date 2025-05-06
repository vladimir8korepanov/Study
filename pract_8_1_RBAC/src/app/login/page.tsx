"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  CircularProgress,
} from "@mui/material";
import useAuthStore from "@/store/authStore";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login, isAuthenticated, loading, error } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email) {
      setFormError("Введите email");
      return;
    }
    if (!password) {
      setFormError("Введите пароль");
      return;
    }

    try {
      await login(email, password);
      if (!isAuthenticated) {
        setFormError("Неверные учетные данные");
      }
    } catch (err) {
      setFormError("Ошибка при входе");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Вход в систему
          </Typography>

          {(error || formError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError || error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Войти"}
            </Button>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Link href="/forgot-password" passHref>
                <Typography
                  component="a"
                  variant="body2"
                  color="primary"
                  sx={{ textDecoration: "none" }}
                >
                  Забыли пароль?
                </Typography>
              </Link>
              <Link href="/register" passHref>
                <Typography
                  component="a"
                  variant="body2"
                  color="primary"
                  sx={{ textDecoration: "none" }}
                >
                  Создать аккаунт
                </Typography>
              </Link>
            </Box>
          </Box>

          <Box
            sx={{ mt: 3, p: 2, bgcolor: "background.paper", borderRadius: 1 }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Тестовые учетные данные:
            </Typography>
            <Typography variant="body2">
              <strong>Админ:</strong> admin@example.com / password
            </Typography>
            <Typography variant="body2">
              <strong>Модератор:</strong> moderator@example.com / password
            </Typography>
            <Typography variant="body2">
              <strong>Пользователь:</strong> user@example.com / password
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;