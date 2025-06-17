"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { genres } from "@/constent"


export function GenreSpotlight() {
  return (
    <section className="container w-full mx-auto px-4 py-12 ">
      <div className="text-center mb-12 ">
        <h2 className="text-3xl font-bold mb-4">Explore by Genre</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover your next favorite anime based on the genres you love most
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {genres.map((genre) => {
          const IconComponent = genre.icon
          return (
            <Link key={genre.id} href={`/anime?genre=${genre.id}`} className="h-full bg-black/10 rounded-xl ">
              <Card
                className={`group relative flex flex-col h-full rounded-xl border-2 border-transparent overflow-hidden
            transition-all duration-300 ease-in-out
            bg-gradient-to-br ${genre.bgColor || 'from-blue-900/80 to-purple-900/80 dark:from-blue-950/90 dark:to-purple-950/90'}
            hover:shadow-xl hover:border-primary/40 hover:scale-[1.02]
            dark:bg-gradient-to-br dark:from-blue-900 dark:hover:to-purple-900
            backdrop-blur-sm bg-opacity-80`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="pb-3 pt-5 px-5">
                  <CardTitle className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-full bg-background/90 shadow-sm
                  ${genre.color || 'bg-primary/20 text-primary'}
                  group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <div
                        className="font-bold text-lg text-white group-hover:text-primary transition-colors
                    bg-clip-text bg-gradient-to-r from-white to-gray-200
                    dark:from-white dark:to-gray-300"
                      >
                        {genre.name}
                      </div>
                      <Badge
                        variant="secondary"
                        className="mt-2 text-xs font-medium px-3 py-1 rounded-full
                    bg-primary/10 text-primary border border-primary/20
                    group-hover:bg-primary group-hover:text-primary-foreground
                    transition-all duration-300"
                      >
                        {genre.count} titles
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 px-5 pb-5">
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {genre.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
      <div className="text-center mt-12">
        <Button size="lg" variant="outline" asChild>
          <Link href="/anime">Browse All Genres</Link>
        </Button>
      </div>
    </section>

  )
}
