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
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5">

        <div className="space-y-2">
          {menu.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                pathname === item.link
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

      </aside>

      {/* Right Side */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}