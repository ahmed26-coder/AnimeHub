import { CharacterFilters } from "@/lib/character-filters"
import { CharacterGrid } from "@/lib/character-grid"
import { LoadingGrid } from "@/lib/loading-grid"
import { Suspense } from "react"


export default function CharactersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Anime Characters</h1>
        <p className="text-muted-foreground text-lg">Explore your favorite anime and manga characters</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <CharacterFilters />
        </aside>

        <div className="flex-1">
          <Suspense fallback={<LoadingGrid />}>
            <CharacterGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
