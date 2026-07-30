function Dashboard() {
  return (
    <>
      <div className="mx-auto mt-10 w-full max-w-7xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Panel Principal
            </h1>
            <p className="mt-2 text-gray-600">
              Manage all notifications created in your account.
            </p>
          </div>

          <button className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700">
            New notification
          </button>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="py-4 text-left text-sm font-semibold text-gray-900">
                  Title
                </th>

                <th className="py-4 text-left text-sm font-semibold text-gray-900">
                  Content
                </th>

                <th className="py-4 text-left text-sm font-semibold text-gray-900">
                  Channel
                </th>

                <th className="py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>

                <th className="py-4 text-left text-sm font-semibold text-gray-900">
                  Created
                </th>

                <th className="py-4"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="py-5 font-medium text-gray-900">
                  Welcome Email
                </td>

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
                <td className="py-5 font-medium text-gray-900">
                  Verification Code
                </td>

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

                <td className="py-5 text-gray-600">
                  Don't miss our new discounts.
                </td>

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
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
