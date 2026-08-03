import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  type CreateNotificationForm,
  type Channel,
} from "../types/notification";
import { createNotification } from "../services/notifications.service";
import { useAuth } from "../AuthContext";

function NotificationForm() {
  const navigate = useNavigate();
  const [channelSelect, setChannelSelect] = useState<Channel>("EMAIL");
  const { token } = useAuth();
  const [form, setForm] = useState<CreateNotificationForm>({
    title: "",
    content: "",
    channel: "EMAIL",
    recipient: "",
  });
  const ChannelPlaceholder = {
    EMAIL: "Ingrese su correo...",
    SMS: "Ingrese un número de Celular...",
    PUSH: "Ingrese un token valido...",
  };

  function handleSubmitNotification(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dataValidate = Object.values(form).every(
      (value) => value.trim() !== "",
    );
    if (dataValidate && token) createNotification(form, token);
  }
  function handleCancel() {
    navigate("/dashboard");
  }
  return (
    <div>
      <div className="mx-auto max-w-3xl p-8">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Nueva notificación
          </h1>

          <p className="mt-2 text-gray-500">
            Completa los datos para crear una nueva notificación.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmitNotification}>
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Título
              </label>

              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                required
                id="title"
                type="text"
                placeholder="Ej: Promoción de verano"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-violet-600"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Contenido
              </label>

              <textarea
                value={form.content}
                onChange={(e) =>
                  setForm({
                    ...form,
                    content: e.target.value,
                  })
                }
                required
                id="content"
                rows={5}
                placeholder="Escribe el mensaje..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-violet-600"
              />
            </div>

            <div>
              <label
                htmlFor="channel"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Canal
              </label>

              <select
                value={form.channel}
                required
                id="channel"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-violet-600"
                onChange={(e) => {
                  (setForm({
                    ...form,
                    channel: e.target.value as Channel,
                  }),
                    setChannelSelect(e.target.value as Channel));
                }}
              >
                <option value="EMAIL">Email</option>
                <option value="SMS">SMS</option>
                <option value="PUSH">Push</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="recipient"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Destinatario
              </label>

              <input
                value={form.recipient}
                type={
                  channelSelect === "PUSH"
                    ? "text"
                    : channelSelect === "EMAIL"
                      ? "email"
                      : "number"
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    recipient: e.target.value,
                  })
                }
                required
                id="recipient"
                placeholder={ChannelPlaceholder[channelSelect]}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-violet-600"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={handleCancel}
                type="button"
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                onClick={() => handleSubmitNotification}
                type="submit"
                className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NotificationForm;
