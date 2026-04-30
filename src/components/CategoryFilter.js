"use client";

export default function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
              isActive
                ? "border-indigo-400/70 bg-indigo-500/25 text-indigo-100 shadow-lg shadow-indigo-500/20"
                : "border-slate-300 bg-white/80 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
