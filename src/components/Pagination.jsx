function Pagination({ currentPage, totalPages, itemsPerPage, setItemsPerPage, onPageChange }) {
  if (totalPages === 0) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <label htmlFor="rows-per-page" className="text-sm text-slate-500">
          Rows per page
        </label>
        <select
          id="rows-per-page"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {pageNumbers.map((page) => (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-9 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-sm"
                : "border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
