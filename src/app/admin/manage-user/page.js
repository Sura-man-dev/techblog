"use client";

import { useEffect, useState } from "react";
import { FaUsers, FaUserShield, FaUser, FaSearch, FaSyncAlt, FaTrash } from "react-icons/fa";

export default function UsersPage() {
  const [usersData, setUsersData] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [loading, setLoading] = useState(true);

  async function getUsers() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsersData(data.users || []);
    } catch {
      setUsersData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getUsers(); }, []);

  async function changeRole(id, newRole) {
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      getUsers();
    } catch (error) { console.log(error); }
  }

  async function deleteUser(id) {
    if (!confirm("Delete this user?")) return;
    try {
      await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      getUsers();
    } catch (error) { console.log(error); }
  }

  const filteredUsers = usersData.filter((user) => {
    const matchSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole = role === "All" || user.role === role;
    return matchSearch && matchRole;
  });

  const totalUsers = usersData.length;
  const admins = usersData.filter((u) => u.role === "admin" || u.role === "Admin").length;
  const normalUsers = usersData.filter((u) => u.role === "user" || u.role === "User").length;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-black dark:text-white">Manage Users</h1>
        <p className="text-sm text-black/40 dark:text-white/40 mt-1">
          Manage user accounts, roles, and permissions.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: totalUsers, icon: <FaUsers /> },
          { label: "Administrators", value: admins, icon: <FaUserShield /> },
          { label: "Regular Users", value: normalUsers, icon: <FaUser /> },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-5 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white">{stat.value}</h2>
              <p className="text-sm text-black/40 dark:text-white/40">{stat.label}</p>
            </div>
            <div className="text-2xl text-black/30 dark:text-white/30">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-5">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm bg-transparent text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 outline-none focus:border-black/30 dark:focus:border-white/30 transition"
            />
            <FaSearch className="absolute right-3 top-3 text-black/30 dark:text-white/30" />
          </div>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-black text-black dark:text-white outline-none"
          >
            <option>All</option>
            <option>admin</option>
            <option>user</option>
          </select>

          <button
            onClick={() => { setSearch(""); setRole("All"); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-sm text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            <FaSyncAlt /> Reset
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 overflow-x-auto">
        <div className="px-5 py-4 border-b border-black/10 dark:border-white/10">
          <h2 className="font-bold text-black dark:text-white">
            User Accounts ({filteredUsers.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-black/40 dark:text-white/40">Loading...</div>
        ) : (
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-black/10 dark:border-white/10">
              <tr>
                {["User", "Email", "Role", "Joined", "Posts", ""].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold text-black/40 dark:text-white/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t border-black/5 dark:border-white/5 hover:bg-black/2 dark:hover:bg-white/2">
                  <td className="px-4 py-3 font-medium text-black dark:text-white">{user.name}</td>
                  <td className="px-4 py-3 text-black/60 dark:text-white/60">{user.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      onChange={(e) => changeRole(user._id, e.target.value)}
                      className="border border-black/10 dark:border-white/10 rounded-lg px-2 py-1 text-xs bg-white dark:bg-black text-black dark:text-white outline-none"
                    >
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-black/50 dark:text-white/50">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-black/50 dark:text-white/50">{user.postsCount || 0}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-black/30 dark:text-white/30 hover:text-red-500 transition"
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
