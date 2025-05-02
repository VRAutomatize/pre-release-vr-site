
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

// These would eventually come from an API/backend
const EMPLOYEES = [
  { username: "admin", password: "admin123", name: "Administrador" },
  { username: "funcionario", password: "func123", name: "Funcionário" },
  { username: "kaio.fdcore@vrautomatize.com", password: "kaio2025", name: "Kaio" },
  { username: "rafael.fdcore@vrautomatize.com", password: "rafael2025", name: "Rafael" }
];

export interface User {
  username: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for existing session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // In real implementation, this would be an API call
    const employee = EMPLOYEES.find(
      (emp) => emp.username === username && emp.password === password
    );

    if (employee) {
      const userData = {
        username: employee.username,
        name: employee.name
      };
      setUser(userData);
      localStorage.setItem("auth_user", JSON.stringify(userData));
      toast.success(`Bem-vindo, ${employee.name}!`);
      return true;
    } else {
      toast.error("Usuário ou senha inválidos");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    toast.info("Você saiu do sistema");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
