import Image from "next/image";

export default function VideoCard({ video }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-48 w-full">
        <Image src={video.image} alt={video.title} fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/25">
          <div className="rounded-full bg-white/90 p-3 shadow-md transition-transform group-hover:scale-110">
            <span className="block h-0 w-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-slate-900 pl-1" />
          </div>
        </div>
        {video.duration ? (
          <span className="absolute right-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white">
            {video.duration}
          </span>
        ) : null}
      </div>
      <div className="space-y-2 p-5">
        <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-300">
          {video.category}
        </span>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{video.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{video.description}</p>
      </div>
    </article>
  );
}
