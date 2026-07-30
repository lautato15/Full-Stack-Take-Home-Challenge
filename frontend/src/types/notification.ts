export interface Notification {
  title: string;
  content: string;
  channel: "EMAIL" | "SMS" | "PUSH";
  recipient: string | number;
}
