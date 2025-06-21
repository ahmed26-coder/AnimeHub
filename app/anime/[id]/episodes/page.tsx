import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { AnimeEpisodes } from "@/components/layouts/anime/anime-episodes"

// تعريف نوع PageProps مع params كـ Promise
interface PageProps {
  params: Promise<{ id: string }>;
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

export default async function AnimeEpisodesPage({ params }: PageProps) {
  const { id } = await params; // فك الـ Promise للحصول على id
  const anime = await getAnime(id)

  if (!anime) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link href={`/anime/${id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Details
          </Link>
        </Button>

        <div className="flex items-center gap-4 mb-4">
          <Image
            src={anime.data.images.jpg.image_url || "/placeholder.svg"}
            alt={anime.data.title}
            width={100}
            height={50}
            className="w-16 h-20 object-cover rounded"
          />
          <div>
            <h1 className=" text-xl sm:text-3xl font-bold">{anime.data.title}</h1>
            <p className="text-muted-foreground">Episodes</p>
          </div>
        </div>
      </div>

      <AnimeEpisodes animeId={id} animeTitle={anime.data.title} />
    </div>
  )
}