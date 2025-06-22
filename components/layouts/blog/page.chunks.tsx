import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import BlogContent from "./page.client";

interface JikanAnimeItem {
  mal_id: number;
  title: string;
  url: string;
  synopsis: string;
  aired: {
    from: string | null;
  };
  images: {
    jpg: {
      image_url: string;
    };
  };
}

async function fetchArticles() {
  try {
    const res = await fetch("https://api.jikan.moe/v4/top/anime", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    const articles = (data.data as JikanAnimeItem[]).map((item) => ({
      title: item.title,
      mal_id: item.mal_id,
      link: item.url,
      pubDate: item.aired?.from || "Date not available",
      description: item.synopsis || "No description available.",
      thumbnail: item.images?.jpg?.image_url,
    }));

    return { articles, error: null };
  } catch (err: unknown) {
    let errorMessage = "Unknown error";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error("Error fetching anime data:", err);
    return { articles: [], error: errorMessage };
  }
}

export default async function BlogPage() {
  const { articles, error } = await fetchArticles();

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">🎌 Best anime</h1>
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          </div>
        }
      >
        <BlogContent articles={articles} error={error} />
      </Suspense>
    </section>
  );
}
