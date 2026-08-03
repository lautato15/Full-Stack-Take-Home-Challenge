export type Notification = {
  id?: string;
  title: string;
  content: string;
  channel: "EMAIL" | "SMS" | "PUSH";
  recipient: string;
  sentAt: Date | null;
};

export type CreateNotificaction = {
  title: string;
  content: string;
  channel: "EMAIL" | "SMS" | "PUSH";
  recipient: string;
};

export interface Token {
  token: string;
}

export type Channel = "EMAIL" | "SMS" | "PUSH";

export type CreateNotificationForm = {
  title: string;
  content: string;
  channel: Channel;
  recipient: string;
};