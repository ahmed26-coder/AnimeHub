import { Card, CardContent } from "@/components/ui/card"

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 20 }).map((_, i) => (
        <Card key={i} className=" pt-0 h-full overflow-hidden">
          <div className="aspect-[3/4] bg-muted animate-pulse" />
          <CardContent className="p-4 pt-0 h-full ">
            <div className="h-4 bg-muted rounded animate-pulse mb-2" />
            <div className="h-3 bg-muted rounded animate-pulse w-2/3 mb-2" />
            <div className="flex gap-2">
              <div className="h-5 bg-muted rounded animate-pulse w-16" />
              <div className="h-5 bg-muted rounded animate-pulse w-12" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
