export const metadata = {
  title: "About | TechTalk",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">About TechTalk</h1>
      <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
        TechTalk is a modern content platform focused on helping builders stay informed and inspired.
        We publish practical tutorials, opinion pieces, and curated news covering software engineering,
        cloud, AI, and product design.
      </p>
      <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
        Our mission is to make technology knowledge more accessible through clear writing, engaging
        video content, and a clean reading experience that works beautifully on every device.
      </p>
    </section>
  );
}
