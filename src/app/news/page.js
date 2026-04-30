"use client";

import { useMemo, useState } from "react";
import Section from "@/components/Section";
import NewsCard from "@/components/NewsCard";
import CategoryFilter from "@/components/CategoryFilter";
import { newsCategories, newsItems } from "@/data/content";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredNews = useMemo(() => {
    if (activeCategory === "All") return newsItems;
    return newsItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-8">
      <Section
        title="Tech News"
        subtitle="Concise, readable updates from across the global tech landscape."
      >
        <CategoryFilter categories={newsCategories} activeCategory={activeCategory} onChange={setActiveCategory} />
        <div className="grid gap-4 md:grid-cols-2">
          {filteredNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </Section>
    </div>
  );
}




