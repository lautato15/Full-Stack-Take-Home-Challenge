import type { Notification } from "../types/notification";

type NotificationToastProp = {
  notification: Notification;
};
function NotificationToast({ notification }: NotificationToastProp) {
  console.log("TOAST");
  console.log(notification);
  return (
    <div className="space-y-2">
      <p className="font-bold">Notificacion creada con Exito</p>

      <div className="text-sm">
        <p>
          <strong>Título:</strong> {notification.title}
        </p>

        <p>
          <strong>Canal:</strong> {notification.channel}
        </p>

        <p>
          <strong>Destinatario:</strong> {notification.recipient}
        </p>

        <p>
          <strong>Estado de Envio:</strong>{" "}
          {notification.sentAt
            ? new Date(notification.sentAt).toLocaleString()
            : "Pendiente"}
        </p>
      </div>
    </div>
  );
}

export default NotificationToast;
