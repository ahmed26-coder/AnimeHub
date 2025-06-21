"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Star, Calendar } from "lucide-react"

interface Stats {
  totalAnime: number
  totalManga: number
  avgScore: number
  currentSeason: string
}

export function AnimeStats() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    // Simulate fetching stats
    setStats({
      totalAnime: 50000,
      totalManga: 100000,
      avgScore: 7.2,
      currentSeason: "Winter 2024",
    })
  }, [])

  if (!stats) return null

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Platform Statistics</h2>
        <p className="text-muted-foreground">Real-time data from the anime community</p>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Card
    className="border bg-background transition-all duration-300 ease-in-out
      hover:scale-[1.05] hover:shadow-xl hover:border-primary/30"
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Anime</CardTitle>
      <TrendingUp className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{stats.totalAnime.toLocaleString()}</div>
      <p className="text-xs text-muted-foreground">Series & Movies</p>
    </CardContent>
  </Card>

  <Card
    className="border bg-background transition-all duration-300 ease-in-out
      hover:scale-[1.05] hover:shadow-xl hover:border-primary/30"
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Manga</CardTitle>
      <Users className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{stats.totalManga.toLocaleString()}</div>
      <p className="text-xs text-muted-foreground">Titles Available</p>
    </CardContent>
  </Card>

  <Card
    className="border bg-background transition-all duration-300 ease-in-out
      hover:scale-[1.05] hover:shadow-xl hover:border-primary/30"
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Average Score</CardTitle>
      <Star className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{stats.avgScore}</div>
      <p className="text-xs text-muted-foreground">Community Rating</p>
    </CardContent>
  </Card>

  <Card
    className="border bg-background transition-all duration-300 ease-in-out
      hover:scale-[1.05] hover:shadow-xl hover:border-primary/30"
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Current Season</CardTitle>
      <Calendar className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{stats.currentSeason}</div>
      <p className="text-xs text-muted-foreground">Airing Now</p>
    </CardContent>
  </Card>
</div>
    </section>
  )
}
