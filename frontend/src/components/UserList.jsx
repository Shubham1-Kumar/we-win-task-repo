import { useState, useEffect } from "react";
import axios from "axios";

const UserList = ({ refreshTrigger, onEditUser, searchTerm }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          [user.name, user.designation, user.gender, ...user.favorites].some((field) =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const localUsers = localStorage.getItem("users");
      if (localUsers) setUsers(JSON.parse(localUsers));
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
        localStorage.setItem("users", JSON.stringify(response.data));
        setError(null);
      } catch (apiError) {
        if (!localUsers) setError("Failed to fetch users from API.");
      }
    } catch (error) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
      } catch (apiError) {
        console.error("API delete error:", apiError);
      }
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("User deleted successfully");
    }
  };

  const handleEdit = (user) => onEditUser && onEditUser(user);

  if (loading) return <div className="text-center py-4">Loading users...</div>;
  if (error && users.length === 0) return <div className="text-red-500">{error}</div>;
  if (users.length === 0) return <div className="text-gray-500">No users found.</div>;
  if (filteredUsers.length === 0 && searchTerm) return <div className="text-gray-500">No matching users.</div>;

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">
        User List {searchTerm && <span className="text-gray-500">- Search Results</span>}
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left border">User ID</th>
              <th className="py-3 px-4 text-left border">Name</th>
              <th className="py-3 px-4 text-left border">Gender</th>
              <th className="py-3 px-4 text-left border">Designation</th>
              <th className="py-3 px-4 text-left border">Favorites</th>
              <th className="py-3 px-4 text-center border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {(filteredUsers.length > 0 ? filteredUsers : users).map((user) => (
              <tr key={user._id || user.tempId} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4 border">{user._id || user.tempId}</td>
                <td className="py-3 px-4 border">{user.name}</td>
                <td className="py-3 px-4 border">{user.gender}</td>
                <td className="py-3 px-4 border">{user.designation}</td>
                <td className="py-3 px-4 border max-w-xs break-words">{user.favorites.join(", ")}</td>
                <td className="flex  justify-center py-3 px-4 border text-center">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200 mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                    onClick={() => handleDelete(user._id || user.tempId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
