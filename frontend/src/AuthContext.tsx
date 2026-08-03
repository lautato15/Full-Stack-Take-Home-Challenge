import { createContext, useContext } from "react";

export type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) throw new Error("AuthContext no encontrado");

  return auth;
}
