import { createContext, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";

export const AuthContext = createContext<AuthContextType | null>({
  token: null,
  setToken: () => {},
});

export type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

function App() {
  const [token, setToken] = useState<string | null>(null);

  return (
    <>
      <ToastContainer aria-label="Alert" />

      <AuthContext.Provider value={{ token, setToken }}>
        {!token && <Login />}
        {token && "Estas logueado"}
      </AuthContext.Provider>
    </>
  );
}

export default App;
