import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageCircle, Star, TrendingUp, Heart, Award } from "lucide-react"
import Link from "next/link"

export function CommunitySection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          Join Our Community
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Connect with fellow anime enthusiasts, share recommendations, and discover new favorites together
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Discussion Forums</h3>
          <p className="text-muted-foreground mb-4">
            Join conversations about your favorite anime, share theories, and connect with like-minded fans.
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </Card>

        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Rating & Reviews</h3>
          <p className="text-muted-foreground mb-4">
            Rate anime and manga, write reviews, and help others discover great content.
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </Card>

        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Personal Lists</h3>
          <p className="text-muted-foreground mb-4">
            Create and manage your watchlist, favorites, and completed series all in one place.
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Community Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">25K+</div>
                <div className="text-sm text-muted-foreground">Discussions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100K+</div>
                <div className="text-sm text-muted-foreground">Recommendations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Community Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Weekly anime discussion threads</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Seasonal anime recommendations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Character popularity contests</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Manga reading clubs</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Fan art showcases</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Join?</h3>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Be part of a growing community of anime lovers. Share your passion, discover new series, and make friends who
          share your interests.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" >
            <Button size="lg">
              <Users className="h-4 w-4 mr-2" />
              Join Community
            </Button>
          </Link>
          <Link href="/about" >
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
