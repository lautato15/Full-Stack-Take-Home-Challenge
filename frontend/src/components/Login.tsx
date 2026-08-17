import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import { login, register } from "../services/auth.service";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flagLog, setFlagLog] = useState<Boolean>(true); //Login: true Register: false

  const { setToken } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Los campos son obligatorios");
    } else {
      if (flagLog) {
        const token = await login(email, password);
        if (!token) {
          toast.error("Error interno del sistema, vuelva a intentarlo");
          console.log({ message: "Error al obtener token", token: token });
        } else if (token !== "off") {
          setToken(token);
          localStorage.setItem("token", token);
        }
      } else {
        const token = await register(email, password);
        if (!token) {
          toast.error("Error interno del sistema, vuelva a intentarlo");
          console.log({ message: "Error al obtener token", token: token });
        } else if (token !== "off") {
          setToken(token);
          localStorage.setItem("token", token);
        }
      }
    }
  }
  return (
    <div className="relative min-h-screen">
      {/* Cuadro informativo */}
      <div className="absolute top-6 left-6 w-80 rounded-lg border border-gray-300 bg-white p-5 shadow-md">
        <h2 className="mb-3 text-lg font-semibold">Aplicación de prueba</h2>

        <p className="mb-3 text-sm">
          Podés utilizar la cuenta de demostración para explorar la aplicación
          con notificaciones precargadas:
        </p>

        <div className="mb-3 rounded-md bg-gray-100 p-3 text-sm">
          <p>
            <strong>Email:</strong> admin@mail.com
          </p>

          <p>
            <strong>Contraseña:</strong> 1234
          </p>
        </div>

        <p className="text-sm">
          También podés registrarte y crear tus propias notificaciones para
          probar todas las funcionalidades.
        </p>
      </div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src="./icon-notify.png"
            alt="App Notifications Icon"
            className="mx-auto h-26 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
            {flagLog ? "Ingrese a su cuenta" : "Registre su cuenta"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form
            action="/login"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-black-100"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="block w-full  rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10  border-solid border-2 border-black placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between ">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-black-100"
                >
                  Contraseña
                </label>
                <div className="text-sm">
                  {flagLog && (
                    <a
                      href="#"
                      className="font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      Olvidaste tu contraseña?
                    </a>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="block border-black border-solid border-2 w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {flagLog ? "Ingresar" : "Registrar"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            {flagLog
              ? "No tiene cuenta, registrese aquí:"
              : "Ya tienes una cuenta, ingrese aquí"}
            <a
              href="#"
              className="font-semibold text-indigo-400 hover:text-indigo-300 pl-2"
              onClick={() => {
                setFlagLog(!flagLog);
              }}
            >
              {flagLog ? "Registrar" : "Ingresar"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
