export type Notification = {
  id: number;
  title: string;
  content: string;
  channel: "EMAIL" | "SMS" | "PUSH";
  recipient: string;
  sentAt: Date | null;
};

export type SendNotificaction = {
  id?: number;
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

export type IconProps = {
  size?: number;
  className?: string;
};

export type NotificationRowProps = {
  notification: Notification;
  onDelete: (id: number) => Promise<void>;
  onSend: (id: number) => Promise<void>;
  onEdit: (notification: Notification) => Promise<void>;
};
