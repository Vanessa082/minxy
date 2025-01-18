import { DeleteIcon, EditIcon, EyeIcon, LucideEdit, PenIcon, TrashIcon } from "lucide-react";

export default function HistoryTable() {
  return (
    <div className="overflow-hidden border border-strict-dark-300 rounded-lg shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-strict-dark-400" role="table">
          <caption className="sr-only">Table displaying click counts, original links, short links, and their status</caption>
          <thead className="bg-strict-dark-300 text-strict-white-500">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Original Link
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Short Link
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-strict-dark-200 text-strict-white-500">
            {/* Row 1 */}
            <tr className="hover:bg-strict-dark-300 focus-within:bg-strict-dark-300">
              <td className="px-5 py-4">1</td>
              <td className="px-5 py-4 ">
                https://www.google.com/search?q=CollectiveMind&oq=CollectiveMind&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJ
              </td>
              <td className="px-5 py-4 ">https://minilink-sklo.onrender.com/r/w_GkqAjLMq</td>
              <td className="px-5 py-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-app-blue-500 text-app-white-500 rounded-full">
                  Active
                </span>
              </td>
              <td className="px-5 py-4 text-xs flex items-center gap-3">
                <button
                  className="w-5 h-5 text-blue-500 hover:text-blue-700 focus:outline-none"
                  title="Edit"
                  aria-label="Edit"
                >
                  <PenIcon />
                </button>
                <button
                  className="w-5 h-5 text-red-700 hover:text-red-900 focus:outline-none"
                  title="Delete"
                  aria-label="Delete"
                >
                  <TrashIcon />
                </button>
                <button
                  className="w-5 h-5 text-gray-500 hover:text-gray-700 focus:outline-none"
                  title="View"
                  aria-label="View"
                >
                  <EyeIcon />
                </button>
              </td>

            </tr>
            {/* Row 2 */}
            <tr className="">
              <td className="px-5 py-4">2</td>
              <td className="px-5 py-4 ">
                https://example.com/long-link-example-for-test
              </td>
              <td className="px-5 py-4 ">https://short.ly/test</td>
              <td className="px-5 py-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-app-blue-500 text-app-white-500 rounded-full">
                  Active
                </span>
              </td>
              <td className="px-5 py-4 text-xs flex items-center gap-3">
                <button
                  className="w-5 h-5 text-blue-500 hover:text-blue-700 focus:outline-none"
                  title="Edit"
                  aria-label="Edit"
                >
                  <PenIcon />
                </button>
                <button
                  className="w-5 h-5 text-red-700 hover:text-red-900 focus:outline-none"
                  title="Delete"
                  aria-label="Delete"
                >
                  <TrashIcon />
                </button>
                <button
                  className="w-5 h-5 text-gray-500 hover:text-gray-700 focus:outline-none"
                  title="View"
                  aria-label="View"
                >
                  <EyeIcon />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  )
}