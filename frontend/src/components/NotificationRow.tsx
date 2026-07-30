function NotificationRow() {
  return (
    <tbody className="divide-y divide-gray-200">
      <tr className="hover:bg-gray-50">
        <td className="py-5 font-medium text-gray-900">Welcome Email</td>

        <td className="py-5 text-gray-600">Welcome to our platform!</td>

        <td className="py-5">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            EMAIL
          </span>
        </td>

        <td className="py-5">
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            SENT
          </span>
        </td>

        <td className="py-5 text-gray-500">29/07/2026</td>

        <td className="py-5 text-right">
          <button className="font-medium text-indigo-600 hover:text-indigo-800">
            Edit
          </button>
        </td>
      </tr>

      <tr className="hover:bg-gray-50">
        <td className="py-5 font-medium text-gray-900">Verification Code</td>

        <td className="py-5 text-gray-600">
          Your verification code is 123456.
        </td>

        <td className="py-5">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
            SMS
          </span>
        </td>

        <td className="py-5">
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            SENT
          </span>
        </td>

        <td className="py-5 text-gray-500">28/07/2026</td>

        <td className="py-5 text-right">
          <button className="font-medium text-indigo-600 hover:text-indigo-800">
            Edit
          </button>
        </td>
      </tr>

      <tr className="hover:bg-gray-50">
        <td className="py-5 font-medium text-gray-900">Promotion</td>

        <td className="py-5 text-gray-600">Don't miss our new discounts.</td>

        <td className="py-5">
          <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
            PUSH
          </span>
        </td>

        <td className="py-5">
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
            FAILED
          </span>
        </td>

        <td className="py-5 text-gray-500">27/07/2026</td>

        <td className="py-5 text-right space-x-4">
          <button className="font-medium text-indigo-600 hover:text-indigo-800">
            Edit
          </button>

          <button className="font-medium text-red-600 hover:text-red-800">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  );
}

export default NotificationRow;
