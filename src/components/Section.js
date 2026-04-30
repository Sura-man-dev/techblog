export default function Section({ title, subtitle, action, children }) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-slate-600 dark:text-slate-300">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
