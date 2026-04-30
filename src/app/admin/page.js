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
        <h1 className="flex items-center gap-3 text-2xl md:text-4xl font-bold text-gray-900">
          <FaTachometerAlt className="text-blue-600" />
          Dashboard Overview
        </h1>

        <p className="mt-2 text-sm md:text-base text-gray-500">
          Welcome back, Here&apos;s an overview of your TECH TALK.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* POSTS */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
              <FaFileAlt className="text-xl text-blue-600" />
            </div>

            <div className="text-right">
              <h2 className="text-3xl font-bold text-gray-900">21</h2>
              <p className="text-sm text-gray-500">Total Posts</p>
            </div>
          </div>

          <p className="mt-4 text-sm font-medium text-green-600">
            21 published
          </p>
        </div>

        {/* USERS */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
              <FaUsers className="text-xl text-green-600" />
            </div>

            <div className="text-right">
              <h2 className="text-3xl font-bold text-gray-900">20</h2>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="font-medium text-purple-600">4 admins</span>
            <span className="font-medium text-blue-600">16 regular</span>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100">
              <FaComments className="text-xl text-yellow-600" />
            </div>

            <div className="text-right">
              <h2 className="text-3xl font-bold text-gray-900">12</h2>
              <p className="text-sm text-gray-500">Total Comments</p>
            </div>
          </div>
        </div>

        {/* VIEWS */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
              <FaEye className="text-xl text-purple-600" />
            </div>

            <div className="text-right">
              <h2 className="text-3xl font-bold text-gray-900">75</h2>
              <p className="text-sm text-gray-500">Total Views</p>
            </div>
          </div>

          <p className="mt-4 text-sm font-medium text-green-600">
            ↗ Site engagement
          </p>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">

        <h2 className="mb-6 text-xl md:text-2xl font-bold text-gray-900">
          ⚡ Quick Actions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

          <Link
            href="/admin/posts/create"
            className="rounded-2xl border p-5 text-center transition hover:shadow-md"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <FaPlus className="text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">New Post</p>
          </Link>

          <Link
            href="/admin/posts"
            className="rounded-2xl border p-5 text-center transition hover:shadow-md"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <FaList className="text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Manage Posts</p>
          </Link>

          <Link
            href="/admin/users"
            className="rounded-2xl border p-5 text-center transition hover:shadow-md"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <FaUsers className="text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Manage Users</p>
          </Link>

          <Link
            href="/admin/categories"
            className="rounded-2xl border p-5 text-center transition hover:shadow-md"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <FaTags className="text-emerald-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Categories</p>
          </Link>

          <Link
            href="/admin/comments"
            className="rounded-2xl border p-5 text-center transition hover:shadow-md"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
              <FaComments className="text-yellow-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Comments</p>
          </Link>

          <Link
            href="/admin/settings"
            className="rounded-2xl border p-5 text-center transition hover:shadow-md"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <FaCog className="text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Settings</p>
          </Link>

        </div>
      </div>

    </div>
  );
}