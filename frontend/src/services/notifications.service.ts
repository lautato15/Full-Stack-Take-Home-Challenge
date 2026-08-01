import { toast } from "react-toastify";
import type { Notification } from "../types/notification";

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