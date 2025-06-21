"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Calendar, Search, ExternalLink, ChevronLeft, ChevronRight, Globe } from "lucide-react"
import { availableLanguages } from "@/constent"

interface Chapter {
    id: string
    type: string
    attributes: {
        title?: string
        chapter?: string
        volume?: string
        translatedLanguage: string
        publishAt: string
        readableAt: string
        pages?: number
        version: number
    }
    relationships: Array<{
        id: string
        type: string
        attributes?: {
            name?: string
            website?: string
        }
    }>
}

interface MangaChaptersProps {
    mangaId: string
    mangaTitle: string
    mangaTitles: Array<{ type: string; title: string }>
}

interface Manga {
  id: string;
  attributes: {
    title: {
      [key: string]: string | undefined;
    };
  };
}

export function MangaChapters({ mangaTitle, mangaTitles }: MangaChaptersProps) {
    const [chapters, setChapters] = useState<Chapter[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedLanguage, setSelectedLanguage] = useState("en")
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [mangaDexId, setMangaDexId] = useState<string | null>(null)

    // Search for manga on MangaDex using title
    useEffect(() => {
        async function searchMangaDex() {
            try {
                // Try different title variations
                const searchTitles = [mangaTitle, ...mangaTitles.map((t) => t.title)]

                for (const title of searchTitles) {
                    const searchResponse = await fetch(
                        `https://api.mangadex.org/manga?title=${encodeURIComponent(title)}&limit=5`,
                    )
                    const searchData = await searchResponse.json()

                    if (searchData.data && searchData.data.length > 0) {
                        // Find the best match
                        const bestMatch = searchData.data.find(
                            (manga: Manga) =>
                                manga.attributes.title.en?.toLowerCase() === title.toLowerCase() ||
                                Object.values(manga.attributes.title).some(
                                    (t: string | undefined) => t?.toLowerCase() === title.toLowerCase()
                                ),
                        ) || searchData.data[0]

                        setMangaDexId(bestMatch.id)
                        break
                    }
                }
            } catch (error) {
                console.error("Error searching MangaDex:", error)
            }
        }

        searchMangaDex()
    }, [mangaTitle, mangaTitles])

    // Fetch chapters from MangaDex
    useEffect(() => {
        async function fetchChapters() {
            if (!mangaDexId) return

            setLoading(true)
            try {
                const offset = page * 20
                const response = await fetch(
                    `https://api.mangadex.org/chapter?manga=${mangaDexId}&translatedLanguage[]=${selectedLanguage}&order[chapter]=asc&limit=20&offset=${offset}&includes[]=scanlation_group`,
                )
                const data = await response.json()

                if (data.data) {
                    setChapters(data.data)
                    setTotalPages(Math.ceil(data.total / 20))
                }
            } catch (error) {
                console.error("Error fetching chapters:", error)
                // Create mock chapters if MangaDex fails
                const mockChapters = Array.from({ length: 20 }, (_, i) => ({
                    id: `mock-${i + 1}`,
                    type: "chapter",
                    attributes: {
                        title: `Chapter ${i + 1}`,
                        chapter: `${i + 1}`,
                        volume: Math.ceil((i + 1) / 10).toString(),
                        translatedLanguage: "en",
                        publishAt: new Date(Date.now() - (20 - i) * 24 * 60 * 60 * 1000).toISOString(),
                        readableAt: new Date(Date.now() - (20 - i) * 24 * 60 * 60 * 1000).toISOString(),
                        pages: Math.floor(Math.random() * 20) + 15,
                        version: 1,
                    },
                    relationships: [
                        {
                            id: "mock-group",
                            type: "scanlation_group",
                            attributes: {
                                name: "Sample Scanlation Group",
                            },
                        },
                    ],
                }))
                setChapters(mockChapters)
                setTotalPages(5)
            } finally {
                setLoading(false)
            }
        }

        fetchChapters()
    }, [mangaDexId, selectedLanguage, page])

    const filteredChapters = chapters.filter((chapter) => {
        return (
            chapter.attributes.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chapter.attributes.chapter?.toString().includes(searchTerm)
        )
    })

    if (loading && chapters.length === 0) {
        return (
            <div className="space-y-4">
                <div className="flex gap-4 mb-6 items-center">
                    <div className="h-30 bg-muted rounded animate-pulse flex-1" />
                    <div className="h-10 bg-muted rounded animate-pulse w-32" />
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
                    <CardTitle>Chapters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex sm:flex-row flex-col gap-4 mb-4">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search chapters..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-full"
                            />
                        </div>
                        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger className="w-48">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {availableLanguages.map((lang) => (
                                    <SelectItem key={lang.code} value={lang.code}>
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4" />
                                            {lang.name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        {mangaDexId ? (
                            <>Showing {filteredChapters.length} chapters from MangaDex</>
                        ) : (
                            <>Searching for manga on MangaDex... Showing sample chapters</>
                        )}
                    </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredChapters.map((chapter) => {
                    const scanlationGroup = chapter.relationships.find((rel) => rel.type === "scanlation_group")

                    return (
                        <Card key={chapter.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-5 space-y-3">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-primary/10 rounded-md flex items-center justify-center">
                                        <span className="text-lg font-bold text-primary">
                                            {chapter.attributes.chapter || "?"}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <h3 className="font-semibold text-base line-clamp-1">
                                            Chapter {chapter.attributes.chapter}
                                            {chapter.attributes.title && `: ${chapter.attributes.title}`}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                            {chapter.attributes.volume && (
                                                <span>Vol. {chapter.attributes.volume}</span>
                                            )}

                                            {chapter.attributes.publishAt && (
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(chapter.attributes.publishAt).toLocaleDateString(undefined, {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </div>
                                            )}

                                            {chapter.attributes.pages && (
                                                <span>{chapter.attributes.pages} pages</span>
                                            )}

                                            {chapter.attributes.translatedLanguage && (
                                                <Badge variant="outline" className="text-xs px-2 py-0.5">
                                                    {
                                                        availableLanguages.find(
                                                            (l) => l.code === chapter.attributes.translatedLanguage
                                                        )?.name || chapter.attributes.translatedLanguage
                                                    }
                                                </Badge>
                                            )}
                                        </div>

                                        {scanlationGroup?.attributes?.name && (
                                            <p className="text-xs text-muted-foreground italic">
                                                by {scanlationGroup.attributes.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-2 pt-2">
                                    <Button size="sm" className=" w-[50%] justify-center gap-2">
                                        <BookOpen className="h-4 w-4" />
                                        Read
                                    </Button>

                                    {mangaDexId && (
                                        <Button size="sm" variant="outline" asChild className="w-fit px-2">
                                            <a
                                                href={`https://mangadex.org/chapter/${chapter.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                    <Button variant="outline" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                    </Button>

                    <span className="text-sm text-muted-foreground">
                        Page {page + 1} of {totalPages}
                    </span>

                    <Button variant="outline" onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages - 1}>
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            )}

            {filteredChapters.length === 0 && !loading && (
                <Card>
                    <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">
                            {mangaDexId ? "No chapters found matching your search." : "Manga not found on MangaDex."}
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}