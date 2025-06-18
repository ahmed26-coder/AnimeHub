import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, Newspaper } from "lucide-react"
import { newsItems } from "@/constent"



export function NewsSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
        <div>
          <h2 className="lg:text-3xl text-2xl font-bold mb-2 flex items-center gap-2">
            <Newspaper className="h-8 w-8 text-primary" />
            Latest News & Updates
          </h2>
          <p className="text-muted-foreground">Stay updated with the anime world</p>
        </div>
        <Button variant="outline">
          View All News
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsItems.map((item) => (
          <Card
            key={item.id}
            className="hover:shadow-lg transition-all duration-300 group cursor-pointer border bg-background"
          >
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{item.category}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 line-clamp-3">{item.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{item.readTime}</span>
                <Button variant="ghost" size="sm">
                  Read More
                  <ExternalLink className="h-3 w-3 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
