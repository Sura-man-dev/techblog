import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const metadata = {
  title: "Profile | TechTalk",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/profile");
  }

  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-indigo-400/20 bg-white/85 p-8 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Profile</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Your authenticated account details.</p>

      <div className="mt-8 grid gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Name</p>
          <p className="mt-1 text-base font-medium text-slate-900 dark:text-slate-100">
            {session.user.name ?? "No name available"}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Email</p>
          <p className="mt-1 text-base font-medium text-slate-900 dark:text-slate-100">
            {session.user.email ?? "No email available"}
          </p>
        </div>
      </div>
    </section>
  );
}
