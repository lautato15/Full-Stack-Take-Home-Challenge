import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { PublicRoute } from "./routes/PublicRoutes";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import NotificationForm from "./components/NotificationForm";

function App() {
const [token, setToken] = useState<string | null>(() => {
  return localStorage.getItem("token");
});
  return (
    <>
      <ToastContainer aria-label="Alert" />
      <AuthContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                token ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />{" "}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notifications/new" element={<NotificationForm />} />
              <Route
                path="/notifications/:id/edit"
                element={<NotificationForm />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
