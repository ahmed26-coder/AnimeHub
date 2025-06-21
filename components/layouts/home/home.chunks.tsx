import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Star } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-primary/20 dark:via-background dark:to-secondary/20">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Powered by Jikan API
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Discover Your Next
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Anime Adventure
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore thousands of anime series, manga, and characters. Find detailed information, ratings, and
              recommendations from the most comprehensive anime database.
            </p>
          </div>

          <div className="flex flex-col text-white sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className=" text-white">
              <Link href="/anime">
                <Play className="h-5 w-5 mr-2" />
                Explore Anime
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/manga">
                Browse Manga
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-sm text-muted-foreground">Anime Series</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100,000+</div>
              <div className="text-sm text-muted-foreground">Manga Titles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Characters</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
