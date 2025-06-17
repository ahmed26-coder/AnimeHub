"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X } from "lucide-react"
import { genres, statuse, type } from "@/constent"

export function MangaFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/manga?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/manga")
  }

  const activeFilters = Array.from(searchParams.entries())

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
          {activeFilters.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Sort By */}
          <div>
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <Select
              value={searchParams.get("order_by") || ""}
              onValueChange={(value) => updateFilter("order_by", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Score</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="start_date">Start Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">Type</label>
            <Select
              value={searchParams.get("type") || ""}
              onValueChange={(value) => updateFilter("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {type.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select
              value={searchParams.get("status") || ""}
              onValueChange={(value) => updateFilter("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {statuse.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Genre */}
          <div>
            <label className="text-sm font-medium mb-2 block">Genre</label>
            <div className="grid grid-cols-2 gap-2">
              {genres.map((genre) => {
                const isActive = searchParams.get("genre") === genre.id.toString()
                return (
                  <Button
                    key={genre.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      updateFilter("genre", isActive ? null : genre.id.toString())
                    }
                    className="text-xs"
                  >
                    {genre.name}
                  </Button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
