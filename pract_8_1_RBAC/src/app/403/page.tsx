"use client";

import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ForbiddenPage: React.FC = () => {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          color="error"
          sx={{ fontSize: "6rem", fontWeight: 700 }}
        >
          403
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Доступ запрещен
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          У вас нет прав для доступа к запрошенной странице
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/")}
            sx={{ mx: 2 }}
          >
            На главную
          </Button>
          <Button variant="outlined" onClick={() => router.back()}>
            Назад
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForbiddenPage;
