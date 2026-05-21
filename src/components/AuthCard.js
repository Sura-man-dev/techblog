export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-7 shadow-lg">
      <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-white">{title}</h1>
      <p className="mt-2 text-sm text-black/50 dark:text-white/50">{subtitle}</p>
      <div className="mt-6">{children}</div>
      {footer ? (
        <div className="mt-5 text-sm text-black/50 dark:text-white/50">{footer}</div>
      ) : null}
    </div>
  );
}
