"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Calendar, Search, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

interface Episode {
    mal_id: number
    title: string
    title_japanese?: string
    title_romanji?: string
    aired?: string
    score?: number
    filler: boolean
    recap: boolean
    forum_url?: string
}

interface AnimeEpisodesProps {
    animeId: string
    animeTitle: string
}

export function AnimeEpisodes({ animeId }: AnimeEpisodesProps) {
    const [episodes, setEpisodes] = useState<Episode[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(false)

    useEffect(() => {
        async function fetchEpisodes() {
            setLoading(true)
            try {
                const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/episodes?page=${page}`)
                const data = await response.json()

                if (data.data) {
                    setEpisodes(data.data)
                    setHasNextPage(data.pagination?.has_next_page || false)
                } else {
                    // If no episodes data, create mock episodes based on anime info
                    const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
                    const animeData = await animeResponse.json()
                    const episodeCount = animeData.data.episodes || 12

                    const mockEpisodes = Array.from({ length: Math.min(episodeCount, 25) }, (_, i) => ({
                        mal_id: i + 1,
                        title: `Episode ${i + 1}`,
                        title_japanese: `第${i + 1}話`,
                        aired: undefined, // تغيير من null إلى undefined
                        score: undefined, // تغيير من null إلى undefined
                        filler: false,
                        recap: false,
                    }))

                    setEpisodes(mockEpisodes)
                    setHasNextPage(episodeCount > 25 && page === 1)
                }
            } catch (error) {
                console.error("Error fetching episodes:", error)
                // Create fallback mock episodes
                const mockEpisodes = Array.from({ length: 12 }, (_, i) => ({
                    mal_id: i + 1,
                    title: `Episode ${i + 1}`,
                    title_japanese: `第${i + 1}話`,
                    aired: undefined, // تغيير من null إلى undefined
                    score: undefined, // تغيير من null إلى undefined
                    filler: false,
                    recap: false,
                }))
                setEpisodes(mockEpisodes)
            } finally {
                setLoading(false)
            }
        }

        fetchEpisodes()
    }, [animeId, page])

    const filteredEpisodes = episodes.filter((episode) => {
        return (
            episode.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            episode.mal_id.toString().includes(searchTerm)
        )
    })

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex gap-4 mb-6">
                    <div className="h-30 bg-muted rounded animate-pulse flex-1" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <Card key={i} className="hover:shadow-lg transition-shadow">
                            <CardContent className="px-5 space-y-3">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-muted rounded-md animate-pulse" />
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                                        <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
                                        <div className="flex gap-3">
                                            <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                                            <div className="h-3 w-14 bg-muted rounded animate-pulse" />
                                            <div className="h-3 w-12 bg-muted rounded animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-2 pt-2">
                                    <div className="h-8 w-full bg-muted rounded animate-pulse" />
                                    <div className="h-8 w-10 bg-muted rounded animate-pulse" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Episodes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search episodes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="text-sm text-muted-foreground">Showing {filteredEpisodes.length} episodes</div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEpisodes.map((episode) => (
                    <Card key={episode.mal_id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="px-5 space-y-3">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-primary/10 rounded-md flex items-center justify-center">
                                    <span className="text-lg font-bold text-primary">{episode.mal_id}</span>
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                    <h3 className="font-semibold text-base line-clamp-1">{episode.title}</h3>

                                    {episode.title_japanese && (
                                        <p className="text-sm text-muted-foreground italic line-clamp-1">
                                            {episode.title_japanese}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                        {episode.aired && (
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(episode.aired).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </div>
                                        )}

                                        {episode.score && (
                                            <div className="flex items-center gap-1">
                                                <span>⭐</span>
                                                {episode.score}
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            {episode.filler && (
                                                <Badge variant="outline" className="text-xs px-2 py-0.5">Filler</Badge>
                                            )}
                                            {episode.recap && (
                                                <Badge variant="outline" className="text-xs px-2 py-0.5">Recap</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-2 pt-2">
                                <Button size="sm" className=" w-[50%] justify-center gap-2">
                                    <Play className="h-4 w-4" />
                                    Watch
                                </Button>

                                {episode.forum_url && (
                                    <Button size="sm" variant="outline" asChild className="w-fit px-2">
                                        <a href={episode.forum_url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {(page > 1 || hasNextPage) && (
                <div className="flex justify-center items-center gap-4">
                    <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                    </Button>

                    <span className="text-sm text-muted-foreground">Page {page}</span>

                    <Button variant="outline" onClick={() => setPage((p) => p + 1)} disabled={!hasNextPage}>
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            )}

            {filteredEpisodes.length === 0 && !loading && (
                <Card>
                    <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">No episodes found matching your search.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}