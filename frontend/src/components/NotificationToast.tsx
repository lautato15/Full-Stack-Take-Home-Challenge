import type { Notification } from "../types/types";

type NotificationToastProp = {
  notification: Notification;
  msg: string;
};
function NotificationToast({ notification, msg }: NotificationToastProp) {
  console.log(notification);
  return (
    <div className="space-y-2">
      <p className="font-bold">Notificacion {msg} con exito.</p>

      <div className="text-sm">
        <p>
          <strong>Título:</strong> {notification.title}
        </p>

        <p>
          <strong>Canal:</strong> {notification.channel}
        </p>

        <p>
          <strong>Destinatario: </strong> {notification.recipient}
        </p>

        <p>
          <strong>Estado de Envio: </strong>
          {notification.sentAt
            ? new Date(notification.sentAt).toLocaleString()
            : "Pendiente"}
        </p>
        {notification.sentAt && (
          <p>
            <strong>Fecha de Envio: </strong>
            {new Date(notification.sentAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default NotificationToast;
