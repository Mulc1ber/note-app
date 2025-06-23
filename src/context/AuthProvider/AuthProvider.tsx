import { createContext, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks";

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  user: string | null;
  signin: (newUser: User, callback: () => void) => void;
  signout: (callback: () => void) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser, removeUser] = useLocalStorage<User | null>(
    "user",
    null
  );

  const signin = (newUser: User, callback: () => void) => {
    setUser(newUser);
    callback();
  };

  const signout = (callback: () => void) => {
    removeUser();
    callback();
  };

  const value: AuthContextType = {
    user: user ? JSON.stringify(user) : null,
    signin,
    signout,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};
