"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, BookOpen, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Manga {
  mal_id: number
  title: string
  images: {
    jpg: {
      large_image_url: string
    }
  }
  score?: number
  chapters?: number
  members?: number
  genres?: Array<{ name: string }>
  status?: string
}

export function TopManga() {
  const [manga, setManga] = useState<Manga[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTopManga() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const cacheKey = "top-manga"
        const cachedData = localStorage.getItem(cacheKey)

        if (cachedData) {
          const parsedData = JSON.parse(cachedData)
          if (Array.isArray(parsedData)) {
            setManga(parsedData)
            setLoading(false)
            return
          }
        }

        const response = await fetch("https://api.jikan.moe/v4/top/manga?limit=8")
        if (!response.ok) {
          throw new Error(`Failed to fetch top manga: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        console.log("API response:", data)
        const uniqueManga = Array.from(
          new Map((data.data as Manga[]).map((item) => [item.mal_id, item])).values()
        ) as Manga[]
        setManga(uniqueManga as Manga[])
        localStorage.setItem(cacheKey, JSON.stringify(uniqueManga))
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching top manga:", error.message)
          setError(`Failed to load top manga: ${error.message}. Please try again later.`)
        } else {
          console.error("Unknown error", error)
          setError("An unknown error occurred while fetching top manga.")
        }
        setManga([])
      }
      finally {
        setLoading(false)
      }
    }

    fetchTopManga()
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12 bg-muted/30">
        <h2 className="text-3xl font-bold mb-8">Top Manga</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className=" py-0 h-full overflow-hidden">
              <div className="aspect-[3/4] bg-muted animate-pulse" />
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12 bg-muted/30">
        <h2 className="text-3xl font-bold mb-8">Top Manga</h2>
        <p className="text-red-500">{error}</p>
      </section>
    )
  }

  return (
    <section className="bg-muted/50 dark:bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Top Manga</h2>
          <p className="text-muted-foreground">Highest-rated manga series of all time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {manga.map((item) => (
            <Link key={item.mal_id} href={`/manga/${item.mal_id}`}>
              <Card className="h-full overflow-hidden py-0 hover:shadow-lg transition-shadow group bg-background border">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={item.images.jpg.large_image_url || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/70 text-white">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {item.score || "N/A"}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 pt-0">
                  <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {item.chapters || "N/A"} ch
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {(item.members || 0) / 1000}K
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(item.genres) && item.genres.length > 0 ? (
                      item.genres.slice(0, 2).map((genre) => (
                        <Badge key={genre.name} variant="secondary" className="text-xs">
                          {genre.name}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        No genres
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}