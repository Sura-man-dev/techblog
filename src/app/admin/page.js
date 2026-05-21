import Link from "next/link";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaUsers,
  FaComments,
  FaEye,
  FaPlus,
  FaList,
  FaTags,
  FaCog,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-black dark:text-white">
          <FaTachometerAlt className="text-black/50 dark:text-white/50" />
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-black/50 dark:text-white/50">
          Welcome back. Here&apos;s an overview of TechTalk.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5">
              <FaFileAlt className="text-black/60 dark:text-white/60" />
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold text-black dark:text-white">21</h2>
              <p className="text-sm text-black/40 dark:text-white/40">Total Posts</p>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-black/60 dark:text-white/60">21 published</p>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5">
              <FaUsers className="text-black/60 dark:text-white/60" />
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold text-black dark:text-white">20</h2>
              <p className="text-sm text-black/40 dark:text-white/40">Total Users</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="font-medium text-black/60 dark:text-white/60">4 admins</span>
            <span className="font-medium text-black/40 dark:text-white/40">16 regular</span>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5">
              <FaComments className="text-black/60 dark:text-white/60" />
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold text-black dark:text-white">12</h2>
              <p className="text-sm text-black/40 dark:text-white/40">Total Comments</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5">
              <FaEye className="text-black/60 dark:text-white/60" />
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold text-black dark:text-white">75</h2>
              <p className="text-sm text-black/40 dark:text-white/40">Total Views</p>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-black/60 dark:text-white/60">↗ Site engagement</p>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-5 md:p-6">
        <h2 className="mb-5 text-lg font-bold text-black dark:text-white">Quick Actions</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">

          {[
            { href: "/admin/create-post", icon: <FaPlus />, label: "New Post" },
            { href: "/admin/manage-post", icon: <FaList />, label: "Manage Posts" },
            { href: "/admin/manage-user", icon: <FaUsers />, label: "Manage Users" },
            { href: "/admin/categories", icon: <FaTags />, label: "Categories" },
            { href: "/admin/comments", icon: <FaComments />, label: "Comments" },
            { href: "/admin/settings", icon: <FaCog />, label: "Settings" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-2xl border border-black/10 dark:border-white/10 p-4 text-center transition hover:bg-black/5 dark:hover:bg-white/5 hover:-translate-y-0.5"
            >
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60">
                {action.icon}
              </div>
              <p className="text-xs font-medium text-black/70 dark:text-white/70">{action.label}</p>
            </Link>
          ))}

        </div>
      </div>

    </div>
  );
}
