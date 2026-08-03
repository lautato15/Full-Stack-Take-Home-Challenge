import type { Notification } from "../types/notification";
type colorChannel = { EMAIL: string; SMS: string; PUSH: string };
function NotificationRow({
  title,
  content,
  channel,
  recipient,
  sentAt,
}: Notification) {
  const colorChannel: colorChannel = {
    EMAIL: "blue",
    SMS: "yellow",
    PUSH: "purple",
  };
  const bgColor = colorChannel[channel];
  return (
    <tr className="hover:bg-gray-50 gap-1">
      <td className="py-5 font-medium text-gray-900">{title}</td>

      <td className="py-5 text-gray-600 px-0.5">{content}</td>

      <td className="py-5">
        <span
          className={`rounded-full bg-${bgColor}-100 px-3 py-1 text-sm font-medium text-${bgColor}-700`}
        >
          {channel}
        </span>
      </td>
      <td className="py-5">
        <span
          className={`rounded-full bg-${bgColor}-100 px-3 py-1 text-sm font-medium text-${bgColor}-700`}
        >
          {recipient}
        </span>
      </td>
      <td className="py-5">
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {sentAt ? "ENVIADO" : "FALLO"}
        </span>
      </td>

      <td className="py-5 text-gray-500">
        {sentAt ? sentAt.toLocaleDateString() : null}
      </td>

      {!sentAt && (
        <td className="py-5 text-right flex flex-col justify-around ">
          <button className="font-medium text-indigo-600 hover:text-indigo-800">
            Enviar
          </button>
          <button className="font-medium text-indigo-600 hover:text-indigo-800">
            Edit
          </button>
          <button className="font-medium text-red-600 hover:text-red-800">
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}

export default NotificationRow;
