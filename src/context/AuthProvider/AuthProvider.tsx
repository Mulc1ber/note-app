import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

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

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(
    () => localStorage.getItem("user") || null
  );

  const signin = (newUser: User, callback: () => void) => {
    const parsedUser = JSON.stringify(newUser);

    setUser(parsedUser);
    localStorage.setItem("user", parsedUser);
    callback();
  };

  const signout = (callback: () => void) => {
    setUser(null);
    localStorage.removeItem("user");
    callback();
  };

  const value: AuthContextType = {
    user,
    signin,
    signout,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};
