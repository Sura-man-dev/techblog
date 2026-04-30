export const metadata = {
  title: "Contact | TechTalk",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Contact Us</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Have feedback, collaboration ideas, or a story tip? Send us a message.
      </p>

      <form className="mt-8 space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-indigo-500 transition placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-indigo-500 transition placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="Write your message here..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-indigo-500 transition placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
