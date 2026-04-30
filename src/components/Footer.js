import Link from "next/link";

const socialLinks = [
  { name: "X", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "GitHub", href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">TechTalk</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Insightful technology stories, trends, and tutorials.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
