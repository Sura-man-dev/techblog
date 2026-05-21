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
    <section className="mx-auto max-w-2xl rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-8 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">Profile</h1>
      <p className="mt-2 text-black/50 dark:text-white/50">Your authenticated account details.</p>

      <div className="mt-8 space-y-5">
        <div className="rounded-xl border border-black/8 dark:border-white/8 bg-black/2 dark:bg-white/2 p-4">
          <p className="text-xs uppercase tracking-widest text-black/30 dark:text-white/30 mb-1">Name</p>
          <p className="text-base font-medium text-black dark:text-white">
            {session.user.name ?? "No name available"}
          </p>
        </div>
        <div className="rounded-xl border border-black/8 dark:border-white/8 bg-black/2 dark:bg-white/2 p-4">
          <p className="text-xs uppercase tracking-widest text-black/30 dark:text-white/30 mb-1">Email</p>
          <p className="text-base font-medium text-black dark:text-white">
            {session.user.email ?? "No email available"}
          </p>
        </div>
        <div className="rounded-xl border border-black/8 dark:border-white/8 bg-black/2 dark:bg-white/2 p-4">
          <p className="text-xs uppercase tracking-widest text-black/30 dark:text-white/30 mb-1">Role</p>
          <p className="text-base font-medium text-black dark:text-white capitalize">
            {session.user.role ?? "user"}
          </p>
        </div>
      </div>
    </section>
  );
}
