import { useState } from "react";
import { users } from "../data/users";
import Pagination from "./Pagination";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import UserToolbar from "./UserToolbar";

const emptyUser = {
  name: "",
  email: "",
  role: "Developer",
  status: "Active",
};

function DataTable() {
  const [userList, setUserList] = useState(users);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [editingUser, setEditingUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState(emptyUser);

  const filteredUsers = userList.filter((user) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      !query ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  let visibleUsers = filteredUsers;

  if (sortConfig.key) {
    visibleUsers = [...filteredUsers].sort((a, b) => {
      const valueA = a[sortConfig.key].toLowerCase();
      const valueB = b[sortConfig.key].toLowerCase();

      if (valueA === valueB) return 0;

      const result = valueA < valueB ? -1 : 1;

      return sortConfig.direction === "asc" ? result : -result;
    });
  }

  const totalPages = Math.ceil(visibleUsers.length / itemsPerPage);
  const safePage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * itemsPerPage;

  const currentUsers = visibleUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const resetPage = () => setCurrentPage(1);

  const handleSearch = (value) => {
    setSearch(value);
    resetPage();
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    resetPage();
  };

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));

    resetPage();
  };

  const openAddForm = () => {
    setEditingUser(null);
    setNewUser({ ...emptyUser });
    setIsAddingUser(true);
  };

  const closeAddForm = () => {
    setIsAddingUser(false);
    setNewUser({ ...emptyUser });
  };

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      window.alert("Please enter name and email.");
      return;
    }

    const newId = userList.length
      ? Math.max(...userList.map((user) => user.id)) + 1
      : 1;

    setUserList((current) => [...current, { id: newId, ...newUser }]);

    closeAddForm();
    resetPage();
  };

  const handleEditUser = (user) => {
    setIsAddingUser(false);
    setEditingUser({ ...user });
  };

  const handleSaveEdit = () => {
    if (!editingUser.name.trim() || !editingUser.email.trim()) {
      window.alert("Please enter name and email.");
      return;
    }

    setUserList((current) =>
      current.map((user) => (user.id === editingUser.id ? editingUser : user)),
    );

    setEditingUser(null);
  };

  const handleDeleteUser = (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`,
    );

    if (!confirmed) return;

    setUserList((current) => current.filter((item) => item.id !== user.id));

    setCurrentPage((page) =>
      Math.max(
        1,
        Math.min(page, Math.ceil((visibleUsers.length - 1) / itemsPerPage)),
      ),
    );
  };

  return (
    <div>
      <UserToolbar
        search={search}
        setSearch={handleSearch}
        statusFilter={statusFilter}
        setStatusFilter={handleStatusFilter}
        onAdd={openAddForm}
      />

      {isAddingUser && (
        <UserForm
          title="Add User"
          user={newUser}
          setUser={setNewUser}
          onSave={handleAddUser}
          onCancel={closeAddForm}
          saveLabel="Add User"
        />
      )}

      {editingUser && (
        <UserForm
          title="Edit User"
          user={editingUser}
          setUser={setEditingUser}
          onSave={handleSaveEdit}
          onCancel={() => setEditingUser(null)}
          saveLabel="Save Changes"
        />
      )}

      <UserTable
        users={currentUsers}
        sortConfig={sortConfig}
        onSort={handleSort}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={(value) => {
          setItemsPerPage(value);
          resetPage();
        }}
        onPageChange={setCurrentPage}
      />

      <div className="mt-3 text-center text-xs text-slate-400">
        Showing {currentUsers.length} of {visibleUsers.length} users
      </div>
    </div>
  );
}

export default DataTable;
