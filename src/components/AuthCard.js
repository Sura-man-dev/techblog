export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-indigo-400/20 bg-white/85 p-7 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl dark:bg-slate-900/75">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
      <div className="mt-6">{children}</div>
      {footer ? <div className="mt-5 text-sm text-slate-600 dark:text-slate-300">{footer}</div> : null}
    </div>
  );
}
