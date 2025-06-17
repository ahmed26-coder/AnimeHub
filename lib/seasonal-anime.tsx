"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Calendar, Play, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SeasonalAnime {
  mal_id: number
  title: string
  images: {
    jpg: {
      large_image_url: string
    }
  }
  score?: number
  year?: number
  season?: string
  genres?: Array<{ mal_id: string; name: string }>
  synopsis?: string
  status?: string
  episodes?: number
}

export function SeasonalAnime() {
  const [anime, setAnime] = useState<SeasonalAnime[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSeason, setCurrentSeason] = useState("")
  const [error, setError] = useState("")

useEffect(() => {
  async function fetchSeasonalAnime() {
    try {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1

      let season = "winter"
      if (month >= 3 && month <= 5) season = "spring"
      else if (month >= 6 && month <= 9) season = "summer"
      else if (month >= 10 && month <= 12) season = "fall"

      const seasonLabel = `${season.charAt(0).toUpperCase() + season.slice(1)} ${year}`
      setCurrentSeason(seasonLabel)

      const cacheKey = `anime-${year}-${season}`
      const cachedData = localStorage.getItem(cacheKey)

      if (cachedData) {
        const parsedData = JSON.parse(cachedData)
        if (Array.isArray(parsedData)) {
          const uniqueData = Array.from(
            new Map(parsedData.map((item) => [item.mal_id, item])).values()
          )
          setAnime(uniqueData)
          setLoading(false)
          return
        }
      }

      const response = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?limit=9`)
      if (!response.ok) throw new Error("API Error")

      const data = await response.json()
      if (!Array.isArray(data.data)) {
        throw new Error("Invalid API response")
      }

      const parsedData = data.data as SeasonalAnime[]
      const uniqueAnime: SeasonalAnime[] = Array.from(
        new Map(parsedData.map((item) => [item.mal_id, item])).values()
      )

      setAnime(uniqueAnime)
      localStorage.setItem(cacheKey, JSON.stringify(uniqueAnime))

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to load seasonal anime. Please try again later.")
      setAnime([])
    } finally {
      setLoading(false)
    }
  }

  fetchSeasonalAnime()
}, [])


  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">This Season</h2>
          <div className="h-4 bg-muted rounded w-32 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden rounded-xl shadow-sm">
              <div className="aspect-[3/4] bg-muted animate-pulse" />
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-500">Oops!</h2>
        <p>{error}</p>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">This Season</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Currently airing in {currentSeason}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/anime?status=airing">
            View All
            <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {anime.map((item, index) => (
          <Link key={`${item.mal_id}-${index}`} href={`/anime/${item.mal_id}`} className="h-full">
            <Card className="group relative flex flex-col py-0 overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all border bg-background/80 backdrop-blur-md h-full">
              <div className="aspect-[3/4] relative w-full">
                <Image
                  src={item.images.jpg.large_image_url || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <Badge className="bg-black/60 text-white text-xs">
                    <Play className="h-3 w-3 mr-1" />
                    {item.status || "N/A"}
                  </Badge>
                  <Badge className="bg-black/60 text-white text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    {item.score || "N/A"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 space-y-2 flex flex-col flex-1">
                <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>{item.episodes || "N/A"} eps</span>
                  <span>•</span>
                  <span>{item.year || "N/A"}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {Array.isArray(item.genres) && item.genres.length > 0 ? (
                    item.genres.slice(0, 2).map((genre) => (
                      <Badge key={genre.mal_id} variant="outline" className="text-xs">
                        {genre.name}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      No genres
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-3 mt-auto">
                  {item.synopsis || "No synopsis available."}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}