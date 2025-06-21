import { Suspense } from "react"
import { LoadingGrid } from "@/lib/loading-grid"
import { MangaFilters } from "@/components/layouts/manga/manga-filters"
import { MangaGrid } from "@/components/layouts/manga/manga-grid"

export default function MangaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Explore Manga</h1>
        <p className="text-muted-foreground text-lg">Discover amazing manga series and one-shots</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <MangaFilters />
        </aside>

        <div className="flex-1">
          <Suspense fallback={<LoadingGrid />}>
            <MangaGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
