import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import CreatePostForm from "@/components/CreatePostForm";

export const metadata = {
  title: "Create Post | TechTalk Admin",
};

export default async function AdminCreatePostPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/create-post");
  }

  return (
    <section className="max-w-3xl">
      <h1 className="text-2xl font-bold text-black dark:text-white">Create Post</h1>
      <p className="mt-1 text-sm text-black/40 dark:text-white/40">
        Publish a new article for the TechTalk community.
      </p>
      <CreatePostForm />
    </section>
  );
}
