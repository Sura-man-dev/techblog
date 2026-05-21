"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaPlus,
  FaFileAlt,
  FaUsers,
  FaTags,
  FaComments,
  FaCog,
} from "react-icons/fa";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: <FaTachometerAlt />, link: "/admin" },
    { name: "Create Post", icon: <FaPlus />, link: "/admin/create-post" },
    { name: "Manage Posts", icon: <FaFileAlt />, link: "/admin/manage-post" },
    { name: "Manage Users", icon: <FaUsers />, link: "/admin/manage-user" },
    { name: "Categories", icon: <FaTags />, link: "/admin/categories" },
    { name: "Comments", icon: <FaComments />, link: "/admin/comments" },
    { name: "Settings", icon: <FaCog />, link: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-white dark:bg-black">

      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-black/10 dark:border-white/10 p-4 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-black/30 dark:text-white/30 px-3 mb-3">
          Admin
        </p>
        {menu.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              pathname === item.link
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
