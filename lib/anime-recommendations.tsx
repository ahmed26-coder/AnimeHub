"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Recommendation {
  entry: {
    mal_id: number
    title: string
    images: {
      jpg: {
        large_image_url: string
      }
    }
  }
  votes: number
}

interface AnimeRecommendationsProps {
  animeId: string
}

export function AnimeRecommendations({ animeId }: AnimeRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`)
        const data = await response.json()
        setRecommendations(data.data.slice(0, 8))
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [animeId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-[3/4] bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No recommendations available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className=" h-full py-0">
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendations.map((rec) => (
            <Link key={rec.entry.mal_id} href={`/anime/${rec.entry.mal_id}`}>
              <div className="group space-y-2">
                <div className="aspect-[3/4] relative overflow-hidden rounded">
                  <Image
                    src={rec.entry.images.jpg.large_image_url || "/placeholder.svg"}
                    alt={rec.entry.title}
                    fill
                    priority 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/70 text-white text-xs">
                      <Star className="h-2 w-2 mr-1" />
                      {rec.votes}
                    </Badge>
                  </div>
                </div>
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {rec.entry.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
