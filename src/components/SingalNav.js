"use client";

import { useState } from "react";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  return (
    <header className="w-full border-b bg-white px-6 py-4 shadow-sm dark:bg-slate-900 dark:border-slate-700">
      <div className="flex items-center justify-between">

        {/* LEFT : LOGO + TOGGLE */}
        <div className="flex items-center gap-4">
          <button className="text-xl text-slate-700 dark:text-white lg:hidden">
            <FaBars />
          </button>

          <h1 className="text-2xl font-bold text-indigo-600">
            AdminPanel
          </h1>
        </div>

        {/* CENTER : SEARCH */}
        <div className="hidden w-full max-w-md md:flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-xl border border-slate-300 bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <FaSearch className="absolute left-3 top-3 text-slate-400" />
          </div>
        </div>

        {/* RIGHT : ICONS */}
        <div className="flex items-center gap-4">

          {/* DARK MODE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* NOTIFICATION */}
          <button className="relative rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-white">
            <FaBell />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
            >
              <FaUserCircle className="text-xl" />
              <span className="hidden md:block text-sm font-medium">
                Admin
              </span>
            </button>

            {/* DROPDOWN */}
            {dropdown && (
              <div className="absolute right-0 mt-3 w-48 rounded-xl border bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">

                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                  <FaUserCircle />
                  Profile
                </button>

                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                  <FaCog />
                  Settings
                </button>

                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-slate-800">
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}