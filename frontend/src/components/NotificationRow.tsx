import type { NotificationRowProps } from "../types/types";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EditIcon } from "./icons/EditIcon";
import { SentIcon } from "./icons/SentIcon";
type colorChannel = { EMAIL: string; SMS: string; PUSH: string };
function NotificationRow({
  notification,
  onDelete,
  onSend,
  onEdit,
}: NotificationRowProps) {

  const { title, content, channel, recipient, sentAt, id } = notification;
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
        <span
          className={`rounded-full bg-green-100 ${sentAt ? "bg-green-100" : "bg-red-100"} px-3 py-1 text-sm font-medium ${sentAt ? "text-green-700" : "text-red-700"}`}
        >
          {sentAt ? "ENVIADO " : "PENDIENTE "}
        </span>
      </td>

      <td className="py-5 text-gray-500">
        {sentAt ? sentAt.toLocaleDateString() : null}
      </td>

      {!sentAt && (
        <td className="py-5 text-right flex flex-col justify-around gap-3">
          <button
            title="Enviar notificación"
            className="font-medium text-green-600 hover:text-green-800"
            onClick={() => onSend(id)}
          >
            <SentIcon />
          </button>
          <button
            title="Editar notificación"
            className="font-medium text-indigo-600 hover:text-indigo-800"
            onClick={() => onEdit(notification)}
          >
            <EditIcon />
          </button>
          <button
            title="Eliminar notificación"
            className="font-medium text-red-600 hover:text-red-800 "
            onClick={() => onDelete(id)}
          >
            <DeleteIcon />
          </button>
        </td>
      )}
    </tr>
  );
}

export default NotificationRow;
