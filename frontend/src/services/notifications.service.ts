import { toast } from "react-toastify";

export async function getNotifications(token: string) {
  const notifications = await fetch("http://localhost:3000/", {});
}