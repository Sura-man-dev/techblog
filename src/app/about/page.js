export const metadata = {
  title: "About | TechTalk",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 p-8 shadow-sm sm:p-10">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">About TechTalk</h1>
      <p className="mt-4 leading-7 text-black/60 dark:text-white/60">
        TechTalk is a modern content platform focused on helping builders stay informed and inspired.
        We publish practical tutorials, opinion pieces, and curated news covering software engineering,
        cloud, AI, and product design.
      </p>
      <p className="mt-4 leading-7 text-black/60 dark:text-white/60">
        Our mission is to make technology knowledge more accessible through clear writing, engaging
        video content, and a clean reading experience that works beautifully on every device.
      </p>
    </section>
  );
}
