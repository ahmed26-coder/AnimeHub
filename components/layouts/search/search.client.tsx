"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Calendar, Users, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

interface SearchResult {
  mal_id: number
  title: string
  images: {
    jpg: {
      large_image_url: string
    }
  }
  score: number
  year?: number
  chapters?: number
  members: number
  genres: Array<{ name: string }>
  type: string
  synopsis: string
}

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [totalResults, setTotalResults] = useState(0)
  const searchParams = useSearchParams()

  const query = searchParams.get("q") || ""
  const type = searchParams.get("type") || "anime"

useEffect(() => {
  async function searchContent() {
    if (!query) return

    setLoading(true)
    try {
      const endpoint = type === "characters" ? "characters" : type
      const response = await fetch(
        `https://api.jikan.moe/v4/${endpoint}?q=${encodeURIComponent(query)}&page=${page}&limit=20`,
      )
      const data = await response.json()

      setResults(data.data)
      setHasNextPage(data.pagination.has_next_page)
      setTotalResults(data.pagination.items.total)
      if (data.data.length > 0) {
        toast.success(`Search successful!`, {
          duration: 3000,
        })
      } else {
        toast.error(`No results found.`, {
          duration: 4000,
        })
      }
    } catch (error) {
      console.error("Error searching:", error)
      toast.error("An error occurred while searching.", {
        duration: 4000,
      })
    } finally {
      setLoading(false)
    }
  }

  searchContent()
}, [query, type, page])


  if (!query) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Search Results</h1>
          <p className="text-muted-foreground">Please enter a search query.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results for {query}</h1>
        <p className="text-muted-foreground">{loading ? "Searching..." : `Found ${totalResults} ${type} results`}</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <Card key={i} className=" py-0 overflow-hidden">
              <div className="aspect-[3/4] bg-muted animate-pulse" />
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground">Try adjusting your search terms or browse our categories.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {results.map((item) => (
              <Link key={item.mal_id} href={`/${type === "characters" ? "characters" : type}/${item.mal_id}`}>
                <Card className=" h-full py-0 overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <Image
                      src={item.images.jpg.large_image_url || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.score && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-black/70 text-white">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {item.score}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 pt-0">
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      {item.year && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.year}
                        </div>
                      )}
                      {item.chapters && (
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {item.chapters} ch
                        </div>
                      )}
                      {item.members && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {(item.members / 1000).toFixed(0)}K
                        </div>
                      )}
                    </div>

                    {item.genres && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.genres.slice(0, 2).map((genre) => (
                          <Badge key={genre.name} variant="outline" className="text-xs">
                            {genre.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {item.synopsis && <p className="text-xs text-muted-foreground line-clamp-2">{item.synopsis}</p>}
                  </CardContent>
                </Card>
              </Link>
            ))}
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
        </>
      )}
    </div>
  )
}
