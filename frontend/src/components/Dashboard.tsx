import { useEffect, useState } from "react";
import {
  deleteNotification,
  getNotifications,
  retryNotification,
} from "../services/notifications.service";
import NotificationRow from "./NotificationRow";
import type { Notification } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import NotificationToast from "./NotificationToast";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { token, logout } = useAuth();

  async function loadNotifications() {
    if (!token) return;
    try {
      setLoading(true);
      const data = await getNotifications(token);
      setNotifications(data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message.includes("401")) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleNewNotification() {
    navigate("/notifications/new");
  }
  async function handleSendNotification(id: number) {
    if (token) {
      const result = await retryNotification(token, id);
      loadNotifications();
      if (result.status === 201)
        toast.info(<NotificationToast notification={result} msg={"enviada"} />);
      else toast.info(result.msg);
    }
  }

  async function handleEditNotification(notification: Notification) {
    navigate(`/notifications/${notification.id}/edit`, { state: notification });
  }

  async function handleDeleteNotification(id: number) {
    if (token) {
      const result = await deleteNotification(id, token);
      loadNotifications();
      if (result.status === 200)
        toast.info(
          <NotificationToast notification={result} msg={"eliminada"} />,
        );
    }
  }
  useEffect(() => {
    if (!token) {
      toast.error("Error de credenciales, sera redirigido al /Login");
      navigate("/login");
      return;
    }
    loadNotifications();
  }, [token]);
  return (
    <>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
          <p className="text-xl font-semibold tracking-wide text-gray-700 animate-pulse md:text-2xl">
            Cargando notificaciones...
          </p>
        </div>
      ) : (
        <div className="mx-auto mt-10 w-full max-w-7xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Panel Principal
              </h1>
              <p className="mt-2 text-gray-600">
                Maneja todas las notificaciones creadas en tu cuenta.
              </p>
            </div>
            <div>
              <button
                onClick={logout}
                className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700  me-4"
              >
                Cerrar Sesion
              </button>
              <button
                onClick={handleNewNotification}
                className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
              >
                Nueva notificacion
              </button>
            </div>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="py-4 text-left text-sm font-semibold text-gray-900 w-2/12">
                    Título
                  </th>

                  <th className="py-4 text-left text-sm font-semibold text-gray-900 w-3/10">
                    Contenido
                  </th>

                  <th className="py-4 text-left text-sm font-semibold text-gray-900">
                    Canal
                  </th>
                  <th className="py-4 text-left text-sm font-semibold text-gray-900 w-1/8">
                    Destinatario
                  </th>
                  <th className="py-4 text-left text-sm font-semibold text-gray-900">
                    Estado
                  </th>

                  <th className="py-4 text-left text-sm font-semibold text-gray-900">
                    Enviado
                  </th>
                  <th className="py-4"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <NotificationRow
                    key={notification.id}
                    notification={notification}
                    onDelete={handleDeleteNotification}
                    onSend={handleSendNotification}
                    onEdit={handleEditNotification}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
