export type NotificationStructured = {
  email: {
    id: number;
    recipient: string;
    sentAt: Date | null;
    notificationId: number;
  } | null;
  sms: {
    id: number;
    recipient: string;
    sentAt: Date | null;
    notificationId: number;
  } | null;
  push: {
    id: number;
    recipient: string;
    sentAt: Date | null;
    notificationId: number;
  } | null;
} & {
  title: string;
  content: string;
  channel: string;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  authorId: number;
};
export type NotificationUnstructured = {
  title: string;
  content: string;
  channel: string;
  recipient: string;
  sentAt: Date | null;
};

export interface Token {
  token: string;
}


