import notFound from "@/app/not-found"
import { AnimeCharacters } from "@/lib/anime-characters"
import { AnimeDetails } from "@/lib/anime-details"
import { AnimeRecommendations } from "@/lib/anime-recommendations"

type PageProps = {
  params: Promise<{ id: string }>
}

async function getAnime(id: string) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error("Failed to fetch")
    return res.json()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  return {
    title: `Anime ${id}`,
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const anime = await getAnime(id)

  if (!anime) return notFound()

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimeDetails anime={anime.data} />
      <div className="mt-12 space-y-12">
        <AnimeCharacters animeId={id} />
        <AnimeRecommendations animeId={id} />
      </div>
    </div>
  )
}