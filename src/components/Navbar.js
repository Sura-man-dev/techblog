"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import { FaHome, FaBlog, FaVideo, FaNewspaper, FaInfoCircle, FaEnvelope, FaSearch } from "react-icons/fa";

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
  const router = useRouter();
  const { theme, mounted, toggleTheme } = useTheme();
  const { data: session, status } = useSession();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 10); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchQuery("");
  }

  function handleMobileSearch(e) {
    e.preventDefault();
    const q = mobileSearch.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setMobileSearch("");
    setMobileMenuOpen(false);
  }

  const userInitial = session?.user?.name?.charAt(0)?.toUpperCase() ?? "U";

  // When scrolled: solid white/black bg. When not scrolled: transparent.
  // Text is always readable: on transparent (over hero image) = white. On solid bg = black/white per theme.
  const isTransparent = !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-black border-b border-black/10 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">

          {/* LOGO */}
          <Link href="/" className="text-xl font-bold tracking-tight shrink-0">
            <span className={isTransparent ? "text-white" : "text-black dark:text-white"}>Tech</span>
            <span className={isTransparent ? "text-white/60" : "text-black/40 dark:text-white/40"}>Talk</span>
          </Link>

          {/* CENTER NAV (DESKTOP) */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium relative transition-colors ${
                      isTransparent
                        ? isActive
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                        : isActive
                        ? "text-black dark:text-white"
                        : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className={`absolute left-0 -bottom-1 w-full h-[2px] rounded-full ${isTransparent ? "bg-white" : "bg-black dark:bg-white"}`} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* SEARCH (DESKTOP) */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center">
              <div className="relative">
                <input
                  ref={searchRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className={`w-40 rounded-full px-4 py-1.5 text-sm outline-none transition-all focus:w-52 ${
                    isTransparent
                      ? "border border-white/30 bg-white/10 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/50"
                      : "border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:border-black/30 dark:focus:border-white/30"
                  }`}
                />
                <button type="submit" className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${isTransparent ? "text-white/60" : "text-black/40 dark:text-white/40"}`}>
                  <FaSearch />
                </button>
              </div>
            </form>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`h-9 w-9 flex items-center justify-center rounded-full border transition text-sm font-medium ${
                isTransparent
                  ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                  : "border-black/15 dark:border-white/15 bg-transparent text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {mounted ? (theme === "dark" ? "🌙" : "☀️") : "◐"}
            </button>

            {/* PROFILE / LOGIN */}
            {status !== "loading" && (
              session?.user ? (
                <div className="relative" onMouseEnter={() => setProfileOpen(true)} onMouseLeave={() => setProfileOpen(false)}>
                  <button
                    className={`h-9 w-9 rounded-full border flex items-center justify-center text-sm font-bold transition ${
                      isTransparent
                        ? "border-white/30 bg-white text-black"
                        : "border-black/15 dark:border-white/15 bg-black dark:bg-white text-white dark:text-black"
                    }`}
                  >
                    {userInitial}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl shadow-xl p-2 z-50">
                      <p className="text-xs px-2 py-1 text-black/40 dark:text-white/40 truncate border-b border-black/5 dark:border-white/5 mb-1">
                        {session.user.email}
                      </p>
                      <Link href="/create-post" className="block px-2 py-2 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition">
                        Create Post
                      </Link>
                      <Link href="/profile" className="block px-2 py-2 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition">
                        Profile
                      </Link>
                      {session.user.role === "admin" && (
                        <Link href="/admin" className="block px-2 py-2 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition">
                          Admin Panel
                        </Link>
                      )}
                      <div className="border-t border-black/5 dark:border-white/5 mt-1 pt-1">
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full text-left px-2 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`px-4 py-1.5 text-sm font-semibold rounded-full border transition ${
                    isTransparent
                      ? "border-white/30 bg-white/10 text-white hover:bg-white hover:text-black"
                      : "border-black/15 dark:border-white/15 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  }`}
                >
                  Login
                </Link>
              )
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className={`lg:hidden h-9 w-9 flex items-center justify-center rounded-full border transition text-base ${
                isTransparent
                  ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                  : "border-black/15 dark:border-white/15 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white dark:bg-black border-l border-black/10 dark:border-white/10 shadow-2xl p-6 z-50 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold text-black dark:text-white">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="h-8 w-8 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition">
                ✕
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleMobileSearch} className="mb-5">
              <div className="relative">
                <input
                  type="search"
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 px-4 py-2.5 pr-10 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40">
                  <FaSearch />
                </button>
              </div>
            </form>

            <ul className="space-y-1 flex-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                        isActive
                          ? "bg-black dark:bg-white text-white dark:text-black"
                          : "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <span className="text-black/40 dark:text-white/40">{link.icon}</span>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile theme toggle */}
            <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <span>{mounted ? (theme === "dark" ? "🌙" : "☀️") : "◐"}</span>
                {mounted ? (theme === "dark" ? "Dark Mode" : "Light Mode") : "Theme"}
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
