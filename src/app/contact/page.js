export const metadata = {
  title: "Contact | TechTalk",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-8 shadow-sm sm:p-10">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">Contact Us</h1>
      <p className="mt-3 text-black/50 dark:text-white/50">
        Have feedback, collaboration ideas, or a story tip? Send us a message.
      </p>

      <form className="mt-8 space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-black/70 dark:text-white/70">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-black/30 px-4 py-3 text-black dark:text-white outline-none transition placeholder:text-black/30 dark:placeholder:text-white/30 focus:border-black/40 dark:focus:border-white/40 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-black/70 dark:text-white/70">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-black/30 px-4 py-3 text-black dark:text-white outline-none transition placeholder:text-black/30 dark:placeholder:text-white/30 focus:border-black/40 dark:focus:border-white/40 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-black/70 dark:text-white/70">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="Write your message here..."
            className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-black/30 px-4 py-3 text-black dark:text-white outline-none transition placeholder:text-black/30 dark:placeholder:text-white/30 focus:border-black/40 dark:focus:border-white/40 text-sm"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-xl bg-black dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-black transition hover:bg-black/80 dark:hover:bg-white/80"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
