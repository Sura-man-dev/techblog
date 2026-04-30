import Image from "next/image";

export default function NewsCard({ item }) {
  return (
    <article className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:block">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-300">
            {item.category}
          </span>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">{item.date}</p>
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
      </div>
    </article>
  );
}
