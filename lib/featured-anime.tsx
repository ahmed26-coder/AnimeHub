"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Anime {
  mal_id: number
  title: string
  images: {
    jpg: {
      large_image_url: string
    }
  }
  score: number
  year: number
  members: number
  genres: Array<{ name: string }>
  synopsis: string
}

export function FeaturedAnime() {
  const [anime, setAnime] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedAnime() {
      try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=8")

        if (!response.ok) {
          const text = await response.text()
          console.error(`API Error (${response.status}): ${text}`)
          setAnime([])
          return
        }

        const data = await response.json()

        if (data && Array.isArray(data.data)) {
          setAnime(data.data)
        } else {
          console.error("Unexpected API response structure:", data)
          setAnime([])
        }
      } catch (error) {
        console.error("Error fetching featured anime:", error)
        setAnime([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedAnime()
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Anime</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
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

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Featured Anime</h2>
        <p className="text-muted-foreground">Top-rated anime series you shouldn&#39;t miss</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {anime.map((item) => (
          <Link key={item.mal_id} href={`/anime/${item.mal_id}`}>
            <Card className="overflow-hidden hover:shadow-lg py-0 transition-shadow group">
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
                    {item.score}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.year}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {(item.members / 1000).toFixed(0)}K
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {item.genres.slice(0, 2).map((genre) => (
                    <Badge key={genre.name} variant="secondary" className="text-xs">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
