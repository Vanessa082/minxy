export default function AnalyticsTable() {
  return (
    <table className="min-w-full bg-app-dark-400" role="table">
      <thead className="bg-app-dark-300 text-app-white-500">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            Short Link
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            Original Link
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={2} className="px-5 py-4 text-center text-sm italic text-app-white-500 bg-app-dark-200">
            No history data detected
            You haven't shortened any links
          </td>
        </tr>
      </tbody>
    </table>
  )
}