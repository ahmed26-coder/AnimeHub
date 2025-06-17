import { Suspense } from "react"
import { AnimeFilters } from "@/lib/anime-filters"
import { AnimeGrid } from "@/lib/anime-grid"
import { LoadingGrid } from "@/lib/loading-grid"

export default function AnimePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Explore Anime</h1>
        <p className="text-muted-foreground text-lg">Discover thousands of anime series and movies</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <AnimeFilters />
        </aside>

        <div className="flex-1">
          <Suspense fallback={<LoadingGrid />}>
            <AnimeGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
