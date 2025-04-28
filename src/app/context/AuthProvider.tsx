"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  getAccessToken,
  getRefreshToken,
  login as loginApi,
  refreshAccessToken,
} from "@/lib/api/auth";

interface AuthContextProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("isAuthenticated", isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = getAccessToken();
      if (accessToken) {
        setIsAuthenticated(true);
      } else {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          try {
            await refreshAccessToken(refreshToken);
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Failed to refresh token:", error);
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      await loginApi(username, password);
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    document.cookie = "access=; path=/; max-age=0;";
    document.cookie = "refresh=; path=/; max-age=0;";
    setIsAuthenticated(false);
    router.push("/login");
  };

  // Refresh token function
  const refreshToken = async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        await refreshAccessToken(refreshToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        logout();
      }
    } else {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, isAuthenticated, login, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
