import DataTable from "./components/DataTable";

function App() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="mb-7">
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Admin Dashboard
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            User Management
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage users, update their details, filter records, and keep your
            workspace organized from one place.
          </p>
        </header>

        <DataTable />
      </div>
    </main>
  );
}

export default App;
