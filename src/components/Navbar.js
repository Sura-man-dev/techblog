"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";

import {
  FaHome,
  FaBlog,
  FaVideo,
  FaNewspaper,
  FaInfoCircle,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home", icon: <FaHome /> },
  { href: "/blog", label: "Blog", icon: <FaBlog /> },
  { href: "/videos", label: "Videos", icon: <FaVideo /> },
  { href: "/news", label: "News", icon: <FaNewspaper /> },
  { href: "/about", label: "About", icon: <FaInfoCircle /> },
  { href: "/contact", label: "Contact", icon: <FaEnvelope /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, mounted, toggleTheme } = useTheme();
  const { data: session, status } = useSession();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  if (status === "loading") return null;
  const userInitial =
    session?.user?.name?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-slate-950 border-b">
      <nav className="relative w-full px-6 py-3">

        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="text-xl font-bold z-20">
            <span className="text-indigo-600">Tech</span>
            <span className="text-black dark:text-white">Talk</span>
          </Link>

          {/* 🔥 CENTER NAV (DESKTOP ONLY) */}
          <ul className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2 z-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm relative ${
                      isActive
                        ? "text-indigo-600"
                        : "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
                    }`}
                  >
                    {link.label}

                    {isActive && (
                      <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-indigo-600 rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 z-20">

            {/* 🔥 SEARCH (ONLY DESKTOP) */}
            <div className="hidden lg:block">
              <input
                type="search"
                placeholder="Search articles..."
                className="
                  w-[180px]
                  rounded-full border px-3 py-1.5 text-sm
                  bg-gray-50 dark:bg-slate-900 dark:border-slate-700
                  focus:outline-none
                "
              />
            </div>

            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="h-9 w-9 flex items-center justify-center rounded-full border"
            >
              {mounted ? (theme === "dark" ? "🌙" : "☀️") : "◐"}
            </button>

            {/* PROFILE / LOGIN */}
            {session?.user ? (
              <div
                className="relative"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <button className="h-9 w-9 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-sm font-semibold">
                  {userInitial}
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border rounded-lg shadow p-2 ${
                    profileOpen ? "block" : "hidden"
                  }`}
                >
                  <p className="text-xs px-2 py-1 text-gray-500">
                    {session.user.email}
                  </p>

                  <Link href="/create-post" className="block px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-800 rounded">
                    Create Post
                  </Link>

                  <Link href="/profile" className="block px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-800 rounded">
                    Profile
                  </Link>

                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-2 py-2 text-sm text-red-500 hover:bg-red-50 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="px-3 py-1.5 text-sm border rounded-full">
                Login
              </Link>
            )}

            {/* 🔥 MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-xl z-30"
            >
              ☰
            </button>
          </div>
        </div>

        {/* 🔥 MOBILE DRAWER (UNCHANGED + ICONS) */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="fixed top-0 right-0 h-full w-[60%] bg-white dark:bg-slate-950 shadow-lg p-4 z-50">

              <button onClick={() => setMobileMenuOpen(false)} className="mb-4 text-lg">
                ✕
              </button>

              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-sm"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}