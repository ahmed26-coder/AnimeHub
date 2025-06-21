'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Play, Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

interface AnimeDetailsProps {
  anime: {
    mal_id: number
    title: string
    title_english?: string
    images: {
      jpg: {
        large_image_url: string
      }
    }
    score: number
    scored_by: number
    rank: number
    popularity: number
    members: number
    favorites: number
    synopsis: string
    background?: string
    season?: string
    year: number
    broadcast?: {
      day: string
      time: string
    }
    producers: Array<{ name: string }>
    licensors: Array<{ name: string }>
    studios: Array<{ name: string }>
    genres: Array<{ name: string }>
    themes: Array<{ name: string }>
    demographics: Array<{ name: string }>
    type: string
    source: string
    episodes: number
    status: string
    aired: {
      from: string
      to: string
      string: string
    }
    duration: string
    rating: string
    trailer?: {
      youtube_id: string
      url: string
      embed_url: string
    }
  }
}

export function AnimeDetails({ anime }: AnimeDetailsProps) {
    const handleClick = () => {
    toast("Watching anime is forbidden in Islam.")
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <Card className=" h-full py-0 overflow-hidden">
            <div className="aspect-[3/4] relative">
              <Image
                src={anime.images.jpg.large_image_url || "/placeholder.svg"}
                alt={anime.title}
                fill
                priority
                className="object-cover"
              />
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleClick} className="flex-1" asChild>
                  <Link href={`/anime/${anime.mal_id}/episodes`}>
                    <Play className="h-4 w-4 mr-2" />
                    Watch
                  </Link>
                </Button>
                <Button variant="outline">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 text-sm">
                <p className=" text-red-500 font-medium text-center" >Watching anime is forbidden in Islam and I let myself be warned</p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Score</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    <span className="font-medium">{anime.score}</span>
                    <span className="text-muted-foreground">({anime.scored_by?.toLocaleString()})</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rank</span>
                  <span className="font-medium">#{anime.rank}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Popularity</span>
                  <span className="font-medium">#{anime.popularity}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-medium">{anime.members?.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Favorites</span>
                  <span className="font-medium">{anime.favorites?.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{anime.title}</h1>
          {anime.title_english && anime.title_english !== anime.title && (
            <p className="text-xl text-muted-foreground mb-4">{anime.title_english}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{anime.type}</Badge>
            <Badge variant="outline">{anime.status}</Badge>
            <Badge variant="outline">{anime.source}</Badge>
            {anime.rating && <Badge variant="outline">{anime.rating}</Badge>}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">Episodes:</span>
                <span className="ml-2 font-medium">{anime.episodes || "Unknown"}</span>
              </div>

              <div>
                <span className="text-muted-foreground">Duration:</span>
                <span className="ml-2 font-medium">{anime.duration}</span>
              </div>

              <div>
                <span className="text-muted-foreground">Aired:</span>
                <span className="ml-2 font-medium">{anime.aired.string}</span>
              </div>

              {anime.season && (
                <div>
                  <span className="text-muted-foreground">Season:</span>
                  <span className="ml-2 font-medium capitalize">
                    {anime.season} {anime.year}
                  </span>
                </div>
              )}

              {anime.broadcast && (
                <div>
                  <span className="text-muted-foreground">Broadcast:</span>
                  <span className="ml-2 font-medium">
                    {anime.broadcast.day}s at {anime.broadcast.time}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              {anime.studios.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Studios:</span>
                  <span className="ml-2 font-medium">{anime.studios.map((s) => s.name).join(", ")}</span>
                </div>
              )}

              {anime.producers.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Producers:</span>
                  <span className="ml-2 font-medium">{anime.producers.map((p) => p.name).join(", ")}</span>
                </div>
              )}

              {anime.licensors.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Licensors:</span>
                  <span className="ml-2 font-medium">{anime.licensors.map((l) => l.name).join(", ")}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {anime.trailer && (
          <Card>
            <CardHeader>
              <CardTitle>Trailer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                <iframe
                  src={anime.trailer.embed_url}
                  title="Anime Trailer"
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Synopsis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{anime.synopsis || "No synopsis available."}</p>
          </CardContent>
        </Card>

        {anime.background && (
          <Card>
            <CardHeader>
              <CardTitle>Background</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{anime.background}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Genres & Themes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {anime.genres.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <Badge key={genre.name} variant="secondary">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {anime.themes.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Themes</h4>
                  <div className="flex flex-wrap gap-2">
                    {anime.themes.map((theme) => (
                      <Badge key={theme.name} variant="outline">
                        {theme.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {anime.demographics.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Demographics</h4>
                  <div className="flex flex-wrap gap-2">
                    {anime.demographics.map((demo) => (
                      <Badge key={demo.name} variant="outline">
                        {demo.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
