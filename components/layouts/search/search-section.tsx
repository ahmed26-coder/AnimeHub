"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { popularSearches } from "@/constent"

export function SearchSection() {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("anime")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}&type=${activeTab}`)
    }
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">What are you looking for?</h2>
          <p className="text-muted-foreground">Search through thousands of anime, manga, and characters</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="anime">Anime</TabsTrigger>
            <TabsTrigger value="manga">Manga</TabsTrigger>
            <TabsTrigger value="characters">Characters</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="search"
                placeholder={`Search ${activeTab}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Popular searches</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {popularSearches.map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery(term)
                  router.push(`/search?q=${encodeURIComponent(term)}&type=${activeTab}`)
                }}
                className="text-xs"
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
