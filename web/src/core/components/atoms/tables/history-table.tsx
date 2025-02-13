import { EyeIcon, PenIcon, TrashIcon } from "lucide-react";

export default function ResponsiveHistoryTable() {
  const data = [
    {
      miniLink: "https://minilink-sklo.onrender.com/r/w_GkqAjLMq",
      originalLink:
        "https://www.google.com/search?q=CollectiveMind&oq=CollectiveMind&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJ",
      clicks: 2,
      status: "Active",
      date: "Mon Jan 20 2025",
    },
  ];

  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-semibold">History</h2>
      {/* Desktop View */}
      <div className="max-lg:hidden xl:block  border border-app-dark-300 rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-app-dark-300 text-app-white-500">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Mini Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Original Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-app-dark-500">
            {data.map((item, index) => (
              <tr key={index} className="">
                <td className="px-5 py-4 break-words whitespace-normal">
                  {item.miniLink}
                </td>
                <td className="px-5 py-4 break-words whitespace-normal">
                  {item.originalLink}
                </td>
                <td className="px-5 py-4 break-words whitespace-normal">
                  {item.clicks}
                </td>
                <td className="px-5 py-4 break-words whitespace-normal">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-app-blue-500 text-app-white-500 rounded-full">
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-4 brea-xstext-xs truncateords whitespace-normal">
                  {item.date}
                </td>
                <td className="px-5 py-4 flex items-center gap-3">
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
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile View */}
      <div className="xl:hidden">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-strict-dark-300 p-4 mb-4 rounded-lg shadow"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-xs">Mini Link:</span>
              <a
                href={item.miniLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 underline"
              >
                {item.miniLink}
              </a>
            </div>
            <div className="mt-2">
              <span className="font-medium text-xs">Original Link:</span>
              <p className="text-xs break-words whitespace-normal">
                {item.originalLink}
              </p>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium text-xs">Clicks:</span>
              <span className="text-sm">{item.clicks}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium text-xs">Status:</span>
              <span className="text-sm text-app-blue-500">{item.status}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium text-xs">Date:</span>
              <span className="text-xs truncate">{item.date}</span>
            </div>
            <div className="flex gap-2 mt-3">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// import { EyeIcon, PenIcon, TrashIcon } from "lucide-react";

// export default function HistoryTable() {
//   return (
//     <div className="overflow-hidden border border-strict-dark-300 rounded-lg shadow-lg">
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-strict-dark-400" role="table">
//           <caption className="sr-only">
//             Table displaying click counts, original links, short links, and
//             their status
//           </caption>
//           <thead className="bg-strict-dark-300">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 Clicks
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 Original Link
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 Short Link
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 Status
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           {/* Table Body */}
//           <tbody className="divide-y divide-strict-dark-200">
//             {/* Row 1 */}
//             <tr className="hover:bg-strict-dark-300 focus-within:bg-strict-dark-300">
//               <td className="px-5 py-4 break-words whitespace-normal">1</td>
//               <td className="px-5 py-4 ">
//                 https://www.google.com/search?q=CollectiveMind&oq=CollectiveMind&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJ
//               </td>
//               <td className="px-5 py-4 ">
//                 https://minilink-sklo.onrender.com/r/w_GkqAjLMq
//               </td>
//               <td className="px-5 py-4 break-words whitespace-normal">
//                 <span className="inline-block px-3 py-1 text-xs font-semibold bg-app-blue-500 text-app-white-500 rounded-full">
//                   Active
//                 </span>
//               </td>
//               <td className="px-5 py-4 text-xs flex items-center gap-3">
//                 <button
//                   className="w-5 h-5 text-blue-500 hover:text-blue-700 focus:outline-none"
//                   title="Edit"
//                   aria-label="Edit"
//                 >
//                   <PenIcon />
//                 </button>
//                 <button
//                   className="w-5 h-5 text-red-700 hover:text-red-900 focus:outline-none"
//                   title="Delete"
//                   aria-label="Delete"
//                 >
//                   <TrashIcon />
//                 </button>
//                 <button
//                   className="w-5 h-5 text-gray-500 hover:text-gray-700 focus:outline-none"
//                   title="View"
//                   aria-label="View"
//                 >
//                   <EyeIcon />
//                 </button>
//               </td>
//             </tr>
//             {/* Row 2 */}
//             <tr className="">
//               <td className="px-5 py-4 break-words whitespace-normal">2</td>
//               <td className="px-5 py-4 ">
//                 https://example.com/long-link-example-for-test
//               </td>
//               <td className="px-5 py-4 ">https://short.ly/test</td>
//               <td className="px-5 py-4 break-words whitespace-normal">
//                 <span className="inline-block px-3 py-1 text-xs font-semibold bg-app-blue-500 text-app-white-500 rounded-full">
//                   Active
//                 </span>
//               </td>
//               <td className="px-5 py-4 text-xs flex items-center gap-3">
//                 <button
//                   className="w-5 h-5 text-blue-500 hover:text-blue-700 focus:outline-none"
//                   title="Edit"
//                   aria-label="Edit"
//                 >
//                   <PenIcon />
//                 </button>
//                 <button
//                   className="w-5 h-5 text-red-700 hover:text-red-900 focus:outline-none"
//                   title="Delete"
//                   aria-label="Delete"
//                 >
//                   <TrashIcon />
//                 </button>
//                 <button
//                   className="w-5 h-5 text-gray-500 hover:text-gray-700 focus:outline-none"
//                   title="View"
//                   aria-label="View"
//                 >
//                   <EyeIcon />
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
