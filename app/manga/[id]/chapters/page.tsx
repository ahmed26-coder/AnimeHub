import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { MangaChapters } from "@/components/layouts/manga/manga-chapters"

// تعريف نوع PageProps مع params كـ Promise
interface PageProps {
  params: Promise<{ id: string }>;
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

export default async function MangaChaptersPage({ params }: PageProps) {
  const { id } = await params; // فك الـ Promise للحصول على id
  const manga = await getManga(id)

  if (!manga) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link href={`/manga/${id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Details
          </Link>
        </Button>

        <div className="flex items-center gap-4 mb-4">
          <Image
            src={manga.data.images.jpg.image_url || "/placeholder.svg"}
            alt={manga.data.title}
            width={100}
            height={50}
            className="w-16 h-20 object-cover rounded"
          />
          <div>
            <h1 className=" text-xl sm:text-3xl font-bold">{manga.data.title}</h1>
            <p className="text-muted-foreground">Chapters</p>
          </div>
        </div>
      </div>

      <MangaChapters mangaId={id} mangaTitle={manga.data.title} mangaTitles={manga.data.titles || []} />
    </div>
  )
}