export type Notification = {
  id?: string;
  title: string;
  content: string;
  channel: "EMAIL" | "SMS" | "PUSH";
  recipient: string;
  sentAt: Date | null;
};
// export type NotificationStructured = {
//   title: string;
//   content: string;
//   channel: string;
//   email: { recipient: string; sentAt: string | null } | null;
//   sms: { recipient: string; sentAt: string | null } | null;
//   push: { recipient: string; sentAt: string | null } | null;
// };

export interface Token {
  token: string;
}
