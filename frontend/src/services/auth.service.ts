import { toast } from "react-toastify";

export async function login(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    });
    const data = await response.json();
    if (data.message === "Credenciales incorrectas") {
      toast.error(data.message);
      return "off";
    }
    if (data.access_token) return data.access_token;
  } catch (error) {
    toast.error("Fallo la conexion con el servidor");
    console.log("Fallo la llamada al Servidor");
    return "off";
  }
}

export async function register(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    });
    const data = await response.json();
    if (data.message === "El email ya está registrado")
      toast.error("El email ya esta registrado");
    else if (Array.isArray(data.message)) {
      toast.error(data.message[0]);
      return "off";
    } else if (data.access_token) return data.access_token;
  } catch (error) {
    toast.error("Fallo la conexion con el servidor");
    console.log("Fallo la llamada al Servidor");
    return "off";
  }
}
