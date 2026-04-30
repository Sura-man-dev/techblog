import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import CreatePostForm from "@/components/CreatePostForm";

export const metadata = {
  title: "Create Post | TechTalk",
};

export default async function CreatePostPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/create-post");
  }

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Create Post</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Publish a clean, professional article for the TechTalk community.
      </p>
      <CreatePostForm />
    </section>
  );
}
