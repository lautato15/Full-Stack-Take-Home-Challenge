import type { SendNotificaction, Notification } from "../types/types";
import { parseRecipient } from "./parseRecipient";
const API_URL = `${import.meta.env.VITE_API_URL}/notifications`;

export async function getNotifications(token: string) {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const notifications: Notification[] = await response.json();
  const parseNotifications = notifications.map((n) => {
    if (n.sentAt) return { ...n, sentAt: new Date(n.sentAt) };
    else return n;
  });
  return parseNotifications;
}

export async function createNotification(
  notification: SendNotificaction,
  token: string,
) {
  const parseNotificationSend = parseRecipient(notification);
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(parseNotificationSend),
  });
  const result = await response.json();
  return { status: response.status, ...result };
}
export async function updateNotification(
  notification: SendNotificaction,
  token: string,
  id: number,
) {
  const parseNotificationSend = parseRecipient(notification);
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(parseNotificationSend),
  });
  const result = await response.json();
  return { status: response.status, ...result };
}
export async function deleteNotification(
  idNotification: number,
  token: string,
) {
  const response = await fetch(`${API_URL}/${idNotification}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return { status: response.status, ...result };
}
