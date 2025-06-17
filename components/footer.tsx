import Link from "next/link"
import { Github, Twitter, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container max-w-7xl mx-auto px-4 pt-8 pb-4">
        <div className="grid grid-cols-2 items-center md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AH</span>
              </div>
              <span className="font-bold text-xl">AnimeHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for anime and manga discovery, powered by the Jikan API.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/anime" className="text-muted-foreground hover:text-foreground">
                  Anime
                </Link>
              </li>
              <li>
                <Link href="/manga" className="text-muted-foreground hover:text-foreground">
                  Manga
                </Link>
              </li>
              <li>
                <Link href="/characters" className="text-muted-foreground hover:text-foreground">
                  Characters
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} AnimeHub. All rights reserved.</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500" /> for anime fans
          </p>
        </div>
      </div>
    </footer>
  )
}
