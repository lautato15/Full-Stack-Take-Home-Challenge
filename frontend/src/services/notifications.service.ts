import { toast } from "react-toastify";
import type { CreateNotificaction, Notification } from "../types/notification";
import { parseRecipient } from "./parseRecipient";

export async function getNotifications(
  token: string,
  setNotification: React.Dispatch<React.SetStateAction<Notification[]>>,
) {
  const response = await fetch("http://localhost:3000/notifications", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  type Response = {
    notifications: Notification[];
  };
  const { notifications }: Response = await response.json();
  const parseDates = notifications.map((n) => {
    if (n.sentAt) return { ...n, sentAt: new Date(n.sentAt) };
    else return n;
  });
  setNotification(parseDates);
  return parseDates;
}

export async function createNotification(
  notification: CreateNotificaction,
  token: string,
) {
  const parseNotificationSend = parseRecipient(notification);
  const response = await fetch("http://localhost:3000/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(parseNotificationSend),
  });
  const result = await response.json();
  console.log(result);
  console.log(response.status);
  if (response.status === 201) toast.info(result.msg);
}
