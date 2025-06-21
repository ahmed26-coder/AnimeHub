import notFound from "@/app/not-found"
import { MangaCharacters } from "@/components/layouts/manga/manga-characters"
import { MangaDetails } from "@/components/layouts/manga/manga-details"

type PageProps = {
  params: Promise<{ id: string }>
}

async function getManga(id: string) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error("Failed to fetch")
    return res.json()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null
  }
}

export default async function MangaDetailPage({ params }: PageProps) {
  const { id } = await params
  const manga = await getManga(id)

  if (!manga) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <MangaDetails manga={manga.data} />
      <div className="mt-12">
        <MangaCharacters mangaId={id} />
      </div>
    </div>
  )
}