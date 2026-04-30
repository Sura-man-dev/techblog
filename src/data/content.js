export const featuredPosts = [
  {
    id: 1,
    title: "The New Era of AI Tooling for Developers",
    description:
      "How AI-powered workflows are changing product velocity, code quality, and team collaboration.",
    date: "Apr 20, 2026",
    category: "AI",
    image: "/images/ai-wave.svg",
  },
  {
    id: 2,
    title: "Edge Computing for Modern Web Apps",
    description:
      "A practical look at serving global audiences with low latency architecture and edge functions.",
    date: "Apr 17, 2026",
    category: "Cloud",
    image: "/images/cloud-grid.svg",
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "The Future of Developer Experience Is Here",
    description:
      "Explore the tools, workflows, and product trends transforming how high-performing teams ship software.",
    ctaLabel: "Read More",
    ctaHref: "/blog",
    image: "/images/hero-01.jpg",
  },
  {
    id: 2,
    title: "Inside Modern AI, Cloud, and Product Engineering",
    description:
      "Dive into curated deep dives that blend technical execution with practical product strategy.",
    ctaLabel: "Explore Insights",
    ctaHref: "/news",
    image: "/images/hero-02.svg",
  },
  {
    id: 3,
    title: "Watch, Learn, and Build With Confidence",
    description:
      "From video tutorials to architecture explainers, get premium content designed for builders.",
    ctaLabel: "Watch Videos",
    ctaHref: "/videos",
    image: "/images/hero-02.jpg",
  },
  {
    id: 4,
    title: "Stay Ahead With Curated Tech Intelligence",
    description:
      "Track the most important releases, platform updates, and emerging patterns in one place.",
    ctaLabel: "View Latest News",
    ctaHref: "/news",
    image: "/images/hero-04.svg",
  },
];

export const categories = ["AI", "Web Dev", "Cloud", "Startups", "Design", "Security"];

export const contentItems = [
  {
    id: 101,
    title: "Building a Scalable Next.js Platform",
    description:
      "Patterns and folder structures that keep large App Router projects organized and maintainable.",
    image: "/images/dev-flow.svg",
    category: "Web Development",
    date: "Apr 21, 2026",
    type: "blog",
  },
  {
    id: 102,
    title: "Practical Tailwind for Production Teams",
    description:
      "Utility-first design practices that keep your UI consistent without sacrificing speed.",
    image: "/images/ui-stack.svg",
    category: "Web Development",
    date: "Apr 18, 2026",
    type: "blog",
  },
  {
    id: 103,
    title: "AI Agents in Real Product Workflows",
    description:
      "Where autonomous coding and structured copilots fit into modern product engineering teams.",
    image: "/images/ai-wave.svg",
    category: "AI",
    date: "Apr 15, 2026",
    type: "blog",
  },
  {
    id: 104,
    title: "Shipping Mobile-first Features Faster",
    description:
      "A component strategy that keeps iOS, Android, and web experiences aligned.",
    image: "/images/cloud-grid.svg",
    category: "Mobile",
    date: "Apr 12, 2026",
    type: "blog",
  },
  {
    id: 105,
    title: "Zero Trust Basics for Frontend Teams",
    description:
      "Simple security practices every product team can adopt without slowing releases.",
    image: "/images/dev-flow.svg",
    category: "Cybersecurity",
    date: "Apr 9, 2026",
    type: "blog",
  },
  {
    id: 106,
    title: "Weekly Tech Roundup: Frameworks and Funding",
    description:
      "Key launches, ecosystem shifts, and funding rounds shaping this week in technology.",
    image: "/images/ui-stack.svg",
    category: "Tech News",
    date: "Apr 6, 2026",
    type: "blog",
  },
  {
    id: 201,
    title: "Designing a SaaS Landing Page in Tailwind",
    description: "A complete walkthrough from wireframe to polished responsive UI.",
    image: "/images/video-frame.svg",
    category: "Tutorials",
    date: "Apr 23, 2026",
    duration: "12:40",
    type: "video",
  },
  {
    id: 202,
    title: "MacBook Pro M4 for Developers: Full Review",
    description: "Performance benchmarks, battery tests, and whether the upgrade is worth it.",
    image: "/images/video-frame.svg",
    category: "Tech Reviews",
    date: "Apr 20, 2026",
    duration: "15:05",
    type: "video",
  },
  {
    id: 203,
    title: "Build a Full-stack App in 30 Minutes",
    description: "Coding sprint from blank project to deployed app with modern tooling.",
    image: "/images/video-frame.svg",
    category: "Coding",
    date: "Apr 18, 2026",
    duration: "10:22",
    type: "video",
  },
  {
    id: 204,
    title: "Best AI Video Tools for Creators in 2026",
    description: "Hands-on comparison of generative tools for editing and content production.",
    image: "/images/video-frame.svg",
    category: "AI Videos",
    date: "Apr 15, 2026",
    duration: "11:48",
    type: "video",
  },
  {
    id: 301,
    title: "Series A Momentum Returns for Developer Startups",
    description:
      "Investors are backing infrastructure tools that shorten release cycles and improve reliability.",
    image: "/images/news-pulse.svg",
    category: "Startup News",
    date: "Apr 22, 2026",
    type: "news",
  },
  {
    id: 302,
    title: "Major LLM Release Improves Reasoning Benchmarks",
    description:
      "The newest model generation introduces stronger planning capabilities for production copilots.",
    image: "/images/news-pulse.svg",
    category: "AI Updates",
    date: "Apr 21, 2026",
    type: "news",
  },
  {
    id: 303,
    title: "Framework Ecosystem Ships Faster Build Tooling",
    description:
      "Compiler and bundler updates target shorter feedback loops for large frontend teams.",
    image: "/images/news-pulse.svg",
    category: "Software Updates",
    date: "Apr 20, 2026",
    type: "news",
  },
  {
    id: 304,
    title: "Product Teams Shift Toward Lean Platform Ownership",
    description:
      "A broader industry trend is pushing cross-functional groups to own quality and delivery together.",
    image: "/images/news-pulse.svg",
    category: "Industry Trends",
    date: "Apr 19, 2026",
    type: "news",
  },
];

export const blogCategories = ["All", "AI", "Web Development", "Mobile", "Cybersecurity", "Tech News"];
export const videoCategories = ["All", "Tutorials", "Tech Reviews", "Coding", "AI Videos"];
export const newsCategories = ["All", "Startup News", "AI Updates", "Software Updates", "Industry Trends"];

export const blogPosts = contentItems.filter((item) => item.type === "blog");
export const videoPosts = contentItems.filter((item) => item.type === "video");
export const newsItems = contentItems.filter((item) => item.type === "news");
