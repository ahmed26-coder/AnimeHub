"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Character {
  character: {
    mal_id: number
    name: string
    images: {
      jpg: {
        image_url: string
      }
    }
  }
  role: string
}

interface MangaCharactersProps {
  mangaId: string
}

export function MangaCharacters({ mangaId }: MangaCharactersProps) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}/characters`)
        const data = await response.json()
        setCharacters(data.data.slice(0, 12))
      } catch (error) {
        console.error("Error fetching characters:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [mangaId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Characters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-3 p-3 border rounded-lg">
                <div className="w-16 h-20 bg-muted animate-pulse rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (characters.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Characters</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No character information available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className=" py-0 h-full">
      <CardHeader>
        <CardTitle>Characters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map((char) => (
            <div
              key={char.character.mal_id}
              className="flex gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="relative w-16 h-20 flex-shrink-0">
                <Image
                  src={char.character.images.jpg.image_url || "/placeholder.svg"}
                  alt={char.character.name}
                  fill
                  priority 
                  className="object-cover rounded"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 mb-1">{char.character.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {char.role}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
