export default function Section({ title, subtitle, action, children }) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-black/50 dark:text-white/50">{subtitle}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
