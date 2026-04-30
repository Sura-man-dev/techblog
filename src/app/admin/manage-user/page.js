"use client";

import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserShield,
  FaUser,
  FaSearch,
  FaFilter,
  FaSyncAlt,
  FaTrash,
} from "react-icons/fa";

export default function UsersPage() {
  const [usersData, setUsersData] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [loading, setLoading] = useState(true);

  /* FETCH USERS */
  async function getUsers() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsersData(data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  /* CHANGE ROLE */
  async function changeRole(id, newRole) {
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  /* DELETE USER */
  async function deleteUser(id) {
    const confirmDelete = confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  /* FILTER */
  const filteredUsers = usersData.filter((user) => {
    const matchSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchRole = role === "All" || user.role === role;

    return matchSearch && matchRole;
  });

  /* STATS */
  const totalUsers = usersData.length;
  const admins = usersData.filter((u) => u.role === "Admin").length;
  const normalUsers = usersData.filter((u) => u.role === "User").length;

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Manage Users</h1>
        <p className="text-gray-500 mt-1">
          Manage user accounts, roles, and permissions.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-6 flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">{totalUsers}</h2>
            <p className="text-gray-500">Total Users</p>
          </div>
          <FaUsers className="text-3xl text-blue-600" />
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">{admins}</h2>
            <p className="text-gray-500">Administrators</p>
          </div>
          <FaUserShield className="text-3xl text-purple-600" />
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">{normalUsers}</h2>
            <p className="text-gray-500">Regular Users</p>
          </div>
          <FaUser className="text-3xl text-green-600" />
        </div>

      </div>

      {/* FILTERS */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
          <FaFilter /> Filters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="relative">
            <input
              type="text"
              placeholder="Search username or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 pr-10"
            />
            <FaSearch className="absolute right-3 top-4 text-gray-400" />
          </div>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >
            <option>All</option>
            <option>Admin</option>
            <option>User</option>
          </select>

          <button className="bg-blue-600 text-white rounded-lg px-4 py-3">
            Apply Filters
          </button>

          <button
            onClick={() => {
              setSearch("");
              setRole("All");
            }}
            className="bg-gray-200 rounded-lg px-4 py-3 flex items-center justify-center gap-2"
          >
            <FaSyncAlt />
            Reset
          </button>

        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white shadow rounded-xl p-4 md:p-6 overflow-x-auto">

        <h2 className="text-xl md:text-2xl font-bold mb-5">
          User Accounts ({filteredUsers.length})
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full min-w-[800px] text-left">

            <thead>
              <tr className="border-b">
                <th className="py-3">User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Posts</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">

                  <td className="py-4 font-medium">{user.name}</td>

                  <td>{user.email}</td>

                  {/* ROLE DROPDOWN */}
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        changeRole(user._id, e.target.value)
                      }
                      className="border rounded-lg px-3 py-1"
                    >
                      <option>Admin</option>
                      <option>User</option>
                    </select>
                  </td>

                  <td>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td>{user.postsCount || 0}</td>

                  {/* ACTION */}
                  <td className="py-4">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
}