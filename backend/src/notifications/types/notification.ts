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

export type SendNotification = {
  title: string;
  content: string;
  recipient: string;
};
export type PackageService = {
  email?: {
    update?: {
      recipient: string;
      sentAt: Date | null;
    };
    create?: {
      recipient: string;
      sentAt: Date | null;
    };
  };
  sms?: {
    create?: {
      recipient: string;
      sentAt: Date | null;
    };
    update?: {
      recipient: string;
      sentAt: Date | null;
    };
  };
  push?: {
    create?: {
      recipient: string;
      sentAt: Date | null;
    };
    update?: {
      recipient: string;
      sentAt: Date | null;
    };
  };
};

//  export type PackageDataCreate = {
//   title: string;
//   content: string;
//   channel: string;
//   authorId: number;
//   email?: {
//     create?: {
//       recipient: string;
//       sentAt: Date | null;
//     };
//   };
//   sms?: {
//     create?: {
//       recipient: string;
//       sentAt: Date | null;
//     };
//   };
//   push?: {
//     create?: {
//       recipient: string;
//       sentAt: Date | null;
//     };
//   };
// };
// export type PackageDataUpdate = {
//   title: string;
//   content: string;
//   authorId: number;
//   email?: {
//     update?: {
//       recipient: string;
//       sentAt: Date | null;
//     };
//   };
//   sms?: {
//     update?: {
//       recipient: string;
//       sentAt: Date | null;
//     };
//   };
//   push?: {
//     update?: {
//       recipient: string;
//       sentAt: Date | null;
//     };
//   };
// };