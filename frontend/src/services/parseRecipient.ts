import type { CreateNotificaction } from "../types/notification";

export function parseRecipient(notification: CreateNotificaction) {
  const { recipient, ...rest } = notification;
  switch (notification.channel) {
    case "EMAIL":
      return {
        ...rest,
        email: recipient,
      };
    case "SMS":
      return {
        ...rest,
        phone: recipient,
      };
    case "PUSH":
      return {
        ...rest,
        token: recipient,
      };
  }
}

