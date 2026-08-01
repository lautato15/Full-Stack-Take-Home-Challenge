import { InternalServerErrorException } from '@nestjs/common';
import { NotificationStructured } from './types/notification';
export function unstructuredNotifications(
  notifications: NotificationStructured[],
) {
  const notificationsUnstructured = notifications.map((notification) =>
    unstructuredNotification(notification),
  );
  return notificationsUnstructured;
}

export function unstructuredNotification(notification: NotificationStructured) {
  const { authorId, email, sms, push, ...unstructured } = notification;
  switch (notification.channel) {
    case 'EMAIL':
      return {
        ...unstructured,
        recipient: notification.email!.recipient,
        sentAt: notification.email!.sentAt,
      };
    case 'SMS':
      return {
        ...unstructured,
        recipient: notification.sms!.recipient,
        sentAt: notification.sms!.sentAt,
      };
    case 'PUSH':
      return {
        ...unstructured,
        recipient: notification.push!.recipient,
        sentAt: notification.push!.sentAt,
      };
    default:
      throw new InternalServerErrorException(
        'Error en la desestructuracion de la consulta',
      );
  }
}
