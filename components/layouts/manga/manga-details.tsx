'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, BookOpen, Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

interface MangaDetailsProps {
  manga: {
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
    authors: Array<{ name: string }>
    serializations: Array<{ name: string }>
    genres: Array<{ name: string }>
    themes: Array<{ name: string }>
    demographics: Array<{ name: string }>
    type: string
    chapters: number
    volumes: number
    status: string
    published: {
      from: string
      to: string
      string: string
    }
  }
}

export function MangaDetails({ manga }: MangaDetailsProps) {
  
  const handleClick = () => {
    toast("Watching anime is forbidden in Islam.")
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <Card className="overflow-hidden py-0 h-full">
            <div className="aspect-[3/4] relative">
              <Image
                src={manga.images.jpg.large_image_url || "/placeholder.svg"}
                alt={manga.title}
                fill
                priority
                className="object-cover"
              />
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleClick} className="flex-1" asChild>
                  <Link href={`/manga/${manga.mal_id}/chapters`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read
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
                    <span className="font-medium">{manga.score}</span>
                    <span className="text-muted-foreground">({manga.scored_by?.toLocaleString()})</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rank</span>
                  <span className="font-medium">#{manga.rank}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Popularity</span>
                  <span className="font-medium">#{manga.popularity}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-medium">{manga.members?.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Favorites</span>
                  <span className="font-medium">{manga.favorites?.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{manga.title}</h1>
          {manga.title_english && manga.title_english !== manga.title && (
            <p className="text-xl text-muted-foreground mb-4">{manga.title_english}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{manga.type}</Badge>
            <Badge variant="outline">{manga.status}</Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">Volumes:</span>
                <span className="ml-2 font-medium">{manga.volumes || "Unknown"}</span>
              </div>

              <div>
                <span className="text-muted-foreground">Chapters:</span>
                <span className="ml-2 font-medium">{manga.chapters || "Unknown"}</span>
              </div>

              <div>
                <span className="text-muted-foreground">Published:</span>
                <span className="ml-2 font-medium">{manga.published.string}</span>
              </div>
            </div>

            <div className="space-y-2">
              {manga.authors.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Authors:</span>
                  <span className="ml-2 font-medium">{manga.authors.map((a) => a.name).join(", ")}</span>
                </div>
              )}

              {manga.serializations.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Serialization:</span>
                  <span className="ml-2 font-medium">{manga.serializations.map((s) => s.name).join(", ")}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Synopsis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{manga.synopsis || "No synopsis available."}</p>
          </CardContent>
        </Card>

        {manga.background && (
          <Card>
            <CardHeader>
              <CardTitle>Background</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{manga.background}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Genres & Themes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {manga.genres.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {manga.genres.map((genre) => (
                      <Badge key={genre.name} variant="secondary">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {manga.themes.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Themes</h4>
                  <div className="flex flex-wrap gap-2">
                    {manga.themes.map((theme) => (
                      <Badge key={theme.name} variant="outline">
                        {theme.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {manga.demographics.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Demographics</h4>
                  <div className="flex flex-wrap gap-2">
                    {manga.demographics.map((demo) => (
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
