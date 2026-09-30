const roles = ["Developer", "Designer", "Manager"];
const statuses = ["Active", "Inactive"];

function UserForm({
  title,
  user,
  setUser,
  onSave,
  onCancel,
  saveLabel,
}) {
  const updateField = (field, value) => {
    setUser((current) => ({ ...current, [field]: value }));
  };

  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            User details
          </p>
          <h2 className="mt-1 text-lg font-bold text-slate-900">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close form"
        >
          ✕
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            type="text"
            value={user.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Enter full name"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
        </label>

        <label className="space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            value={user.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
        </label>

        <label className="space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Role</span>
          <select
            value={user.role}
            onChange={(e) => updateField("role", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-sm font-medium text-slate-700">Status</span>
          <select
            value={user.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          {saveLabel}
        </button>
      </div>
    </section>
  );
}

export default UserForm;
