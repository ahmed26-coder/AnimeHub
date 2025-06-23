"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, ChevronLeft, ChevronRight, Heart } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

export function CharacterGrid() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [likedItems, setLikedItems] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("likedCharacters")
    if (saved) {
      setLikedItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("likedCharacters", JSON.stringify(likedItems))
  }, [likedItems])

  const toggleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    async function fetchCharacters() {
      setLoading(true)
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/characters?page=${page}&limit=20&order_by=favorites&sort=desc`
        )
        const data = await response.json()

        setCharacters(data.data)
        setHasNextPage(data.pagination.has_next_page)
      } catch (error) {
        console.error("Error fetching characters:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [page])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-[3/4] bg-muted animate-pulse" />
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded animate-pulse mb-2" />
              <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {characters.map((character) => {
          const isLiked = likedItems.includes(character.mal_id)
          return (
            <Card
              key={character.mal_id}
              className="h-full py-0 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={character.images.jpg.image_url || "/placeholder.svg"}
                  alt={character.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-black/70 text-white">
                    <Users className="h-3 w-3 mr-1" />
                    {(character.favorites / 1000).toFixed(0)}K
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {character.name}
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleLike(character.mal_id)
                          }}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className={`p-1 rounded-full ${isLiked ? "text-red-500" : "text-gray-500"}`}
                          aria-label="Like"
                        >
                          <Heart fill={isLiked ? "red" : "none"} size={18} />
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-white font-medium">
                          {isLiked ? "You like" : "Not decided yet"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {character.about || "No description available."}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">Page {page}</span>

        <Button variant="outline" onClick={() => setPage((p) => p + 1)} disabled={!hasNextPage}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
