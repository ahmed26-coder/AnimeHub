"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold text-muted-foreground/20 mb-4">404</div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you&#39;re looking for seems to have vanished into another dimension.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="px-8">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold mb-4">What happened?</h2>
            <p className="text-muted-foreground mb-6">
              The page you requested might have been moved, deleted, or you may have entered an incorrect URL. Don&#39;t
              worry though - there&#39;s plenty more anime and manga to discover!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/anime">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Anime
                </Link>
              </Button>

              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-sm text-muted-foreground">
          <p>
            If you believe this is an error, please{" "}
            <Link href="/contact" className="underline font-bold text-base hover:text-foreground">
              contact us
            </Link>{" "}
            and let us know what happened.
          </p>
        </div>
      </div>
    </div>
  )
}
