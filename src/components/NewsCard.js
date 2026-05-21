import Image from "next/image";

export default function NewsCard({ item }) {
  return (
    <article className="group flex gap-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:block bg-black/5 dark:bg-white/5">
        {item.image && (
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        )}
      </div>
      <div className="space-y-1.5 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="rounded-full border border-black/15 dark:border-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-black/70 dark:text-white/70">
            {item.category}
          </span>
          <p className="text-xs text-black/30 dark:text-white/30">{item.date}</p>
        </div>
        <h3 className="text-sm font-semibold text-black dark:text-white line-clamp-2">{item.title}</h3>
        <p className="text-xs text-black/50 dark:text-white/50 line-clamp-2">{item.description}</p>
      </div>
    </article>
  );
}
