import { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import "./index.css"; // Import Tailwind

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const refreshUsers = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management System</h1>

      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <UserForm
          fetchUsers={refreshUsers}
          editingUser={editingUser}
          onCancelEdit={handleCancelEdit}
        />

        <div className="my-4">
          <input
            type="text"
            placeholder="Search by name, designation..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <UserList
          refreshTrigger={refreshTrigger}
          onEditUser={handleEditUser}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}

export default App;
