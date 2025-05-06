"use client";

import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { User, Role } from "@/types";
import useAuthStore from "@/store/authStore";
import axios from "axios";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password?: string }) => Promise<void>;
  checkAuth: () => void;
  hasRole: (role: Role | Role[]) => boolean;
  hasPermission: (permission: { action: string; resource: string } | { action: string; resource: string }[]) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    hasRole,
    checkAuth,
  } = useAuthStore();

  const register = async (userData: Partial<User> & { password?: string }) => {
    try {
      const password = userData.password || "password";
      const response = await axios.post("http://localhost:3001/users", {
        ...userData,
        id: Date.now(),
        role: userData.role || "user",
        permissions: userData.permissions || [
          { action: "read", resource: "dashboard" },
        ],
      });
      const newUser: User = response.data;
      await login(newUser.email, password);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const hasPermission = (permission: { action: string; resource: string } | { action: string; resource: string }[]) => {
    if (!user) return false;
    const perms = Array.isArray(permission) ? permission : [permission];
    return perms.some((p) =>
      user.permissions.some(
        (up) => up.action === p.action && up.resource === p.resource
      )
    );
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("mockUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("mockUser");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        register,
        checkAuth,
        hasRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
