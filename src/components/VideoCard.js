import Image from "next/image";

export default function VideoCard({ video }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48 w-full bg-black/5 dark:bg-white/5">
        {video.image && (
          <Image src={video.image} alt={video.title} fill className="object-cover" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="rounded-full bg-white/90 p-3 shadow-md transition-transform group-hover:scale-110">
            <span className="block h-0 w-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-black pl-1" />
          </div>
        </div>
        {video.duration && (
          <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
            {video.duration}
          </span>
        )}
      </div>
      <div className="space-y-2 p-5">
        <span className="rounded-full border border-black/15 dark:border-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-black/70 dark:text-white/70">
          {video.category}
        </span>
        <h3 className="text-base font-semibold text-black dark:text-white">{video.title}</h3>
        <p className="text-sm text-black/50 dark:text-white/50">{video.description}</p>
      </div>
    </article>
  );
}
