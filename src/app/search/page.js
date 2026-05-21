import { Suspense } from "react";
import SearchResults from "./SearchResults";

export const metadata = {
  title: "Search | TechTalk",
};

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="text-black/30 dark:text-white/30 text-sm">Loading search...</div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
