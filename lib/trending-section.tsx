"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Star, Eye, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface TrendingItem {
  mal_id: number
  title: string
  images: {
    jpg: {
      large_image_url: string
    }
  }
  score?: number
  members?: number
  genres?: Array<{ name: string }>
  type?: string
  rank?: number
}

export function TrendingSection() {
  const [trending, setTrending] = useState<TrendingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTrending(attempt = 1, maxAttempts = 3) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))

        const cacheKey = "trending-anime"
        const cachedData = localStorage.getItem(cacheKey)

        if (cachedData) {
          const parsedData = JSON.parse(cachedData)
          if (Array.isArray(parsedData)) {
            setTrending(parsedData)
            setLoading(false)
            return
          }
        }

        const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=6")
        if (!response.ok) {
          const text = await response.text()
          if (response.status === 429 && attempt < maxAttempts) {
            console.warn(`Rate limit hit, retrying (${attempt}/${maxAttempts})...`)
            return fetchTrending(attempt + 1, maxAttempts)
          }
          throw new Error(`HTTP error! status: ${response.status}, body: ${text}`)
        }

        const data = await response.json()
        console.log("API response:", data)

        if (data && Array.isArray(data.data)) {
          const uniqueData = Array.from(
            new Map(data.data.map((item: TrendingItem) => [item.mal_id, item])).values()
          ) as TrendingItem[]
          setTrending(uniqueData)
          localStorage.setItem(cacheKey, JSON.stringify(uniqueData))
        } else {
          console.error("Unexpected API response:", data)
          setTrending([])
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching trending anime:", error.message)
          setError(`Failed to load trending anime: ${error.message}. Please try again later.`)
        } else {
          console.error("Unknown error:", error)
          setError("An unknown error occurred while fetching trending anime.")
        }
        setTrending([])
      }

    }

    fetchTrending()
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
            <div className="h-4 bg-muted rounded animate-pulse w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className=" py-0 h-full overflow-hidden">
              <div className="aspect-[16/9] bg-muted animate-pulse" />
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
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
        <p className="text-red-500">{error}</p>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Trending Now
          </h2>
          <p className="text-muted-foreground">Most popular anime this week</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/anime?order_by=popularity">
            View All
            <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trending.map((item, index) => (
          <Link key={`${item.mal_id}-${index}`} href={`/anime/${item.mal_id}`}>
            <Card className="overflow-hidden hover:shadow-xl py-0 transition-all duration-300 group relative border bg-background">
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image
                  src={item.images.jpg.large_image_url || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground font-bold">#{index + 1} Trending</Badge>
                </div>

                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/70 text-white">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {item.score || "N/A"}
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-4 text-white/80 text-sm mb-2">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {(item.members || 0) / 1000000}M
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {item.type || "N/A"}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(item.genres) && item.genres.length > 0 ? (
                      item.genres.slice(0, 2).map((genre) => (
                        <Badge key={genre.name} variant="outline" className="text-xs text-white border-white/30">
                          {genre.name}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline" className="text-xs text-white border-white/30">
                        No genres
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}