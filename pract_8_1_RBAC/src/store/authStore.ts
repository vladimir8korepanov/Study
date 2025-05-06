import { create } from "zustand";
import { User, Role } from "@/types";
import axios from "axios";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  hasRole: (role: Role | Role[]) => boolean;
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null, isAuthenticated: false, error: null }),
  hasRole: (role: Role | Role[]) => {
    const state = get();
    if (!state.user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(state.user.role);
  },
  login: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      const users = response.data;
      if (users.length > 0) {
        const loggedInUser: User = users[0];
        set({ user: loggedInUser, isAuthenticated: true, error: null });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      set({ error: "Login failed: Invalid credentials", isAuthenticated: false, user: null });
    } finally {
      set({ loading: false });
    }
  },
  checkAuth: () => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      set({ user: parsedUser, isAuthenticated: true });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;