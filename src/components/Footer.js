import Link from "next/link";

const socialLinks = [
  { name: "X", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "GitHub", href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 dark:border-white/10 bg-white dark:bg-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-base font-bold text-black dark:text-white">TechTalk</p>
          <p className="mt-1 text-sm text-black/40 dark:text-white/40">
            Insightful technology stories, trends, and tutorials.
          </p>
        </div>

        <div className="flex items-center gap-5">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              className="text-sm font-medium text-black/40 dark:text-white/40 transition hover:text-black dark:hover:text-white"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
