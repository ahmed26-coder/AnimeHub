"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Character {
  mal_id: number
  name: string
  images: {
    jpg: {
      image_url: string
    }
  }
  favorites: number
  about: string
}

export function TopCharacters() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = localStorage.getItem("top-characters")
    if (cached) {
      setCharacters(JSON.parse(cached))
      setLoading(false)
      return
    }

    async function fetchTopCharacters() {
      try {
        const response = await fetch(
          "https://api.jikan.moe/v4/characters?order_by=favorites&sort=desc&limit=8"
        )
        const data = await response.json()
        if (data && Array.isArray(data.data)) {
          setCharacters(data.data)
          localStorage.setItem("top-characters", JSON.stringify(data.data))
        } else {
          console.error("Unexpected API response:", data)
        }
      } catch (error) {
        console.error("Error fetching top characters:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopCharacters()
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Popular Characters</h2>
            <div className="h-4 bg-muted rounded animate-pulse w-48" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-[3/4] bg-muted animate-pulse" />
              <CardContent className="p-3">
                <div className="h-3 bg-muted rounded animate-pulse mb-1" />
                <div className="h-2 bg-muted rounded animate-pulse w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Popular Characters</h2>
          <p className="text-muted-foreground">
            Most beloved characters in anime and manga
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/characters">
            View All
            <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {characters.map((character) => (
          <Card
            key={character.mal_id}
            className="overflow-hidden py-0 hover:shadow-lg transition-shadow group"
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <Image
                src={character.images?.jpg?.image_url || "/placeholder.svg"}
                alt={character.name}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-black/70 text-white text-xs flex items-center">
                  <Heart className="h-2 w-2 mr-1 fill-current text-red-400" />
                  {character.favorites >= 1000
                    ? `${(character.favorites / 1000).toFixed(0)}K`
                    : character.favorites}
                </Badge>
              </div>
            </div>

            <CardContent className=" p-3 pt-0">
              <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {character.name}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
