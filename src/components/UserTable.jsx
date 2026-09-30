function UserTable({ users, sortConfig, onSort, onEdit, onDelete }) {
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const sortableHeader = (key, label) => (
    <th
      scope="col"
      className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500"
    >
      <button
        type="button"
        onClick={() => onSort(key)}
        className="inline-flex items-center gap-2 rounded-md transition hover:text-slate-900"
      >
        {label}
        <span className="text-slate-400">{getSortIndicator(key)}</span>
      </button>
    </th>
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="bg-slate-50">
            <tr>
              <th
                scope="col"
                className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                ID
              </th>

              {sortableHeader("name", "Name")}
              {sortableHeader("email", "Email")}
              {sortableHeader("role", "Role")}

              <th
                scope="col"
                className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Status
              </th>

              <th
                scope="col"
                className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="transition hover:bg-slate-50/80">
                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                    {user.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{user.name}</p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {user.email}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {user.role}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onEdit(user)}
                        className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(user)}
                        className="text-sm font-semibold text-rose-600 transition hover:text-rose-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-14 text-center">
                  <div className="mx-auto max-w-sm">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                      🔎
                    </div>

                    <p className="font-semibold text-slate-800">
                      No users found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Try changing your search or filter.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
