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
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { genre, orderOptions, statuses, types } from "@/constent"

export function AnimeFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/anime?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/anime")
  }

  const activeFilters = Array.from(searchParams.entries())

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {activeFilters.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <Select
              value={searchParams.get("order_by") || "score"}
              onValueChange={(value) => updateFilter("order_by", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Score" />
              </SelectTrigger>
              <SelectContent>
                {orderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">Type</label>
            <Select
              value={searchParams.get("type") || "all"}
              onValueChange={(value) =>
                updateFilter("type", value === "all" ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select
              value={searchParams.get("status") || "all"}
              onValueChange={(value) =>
                updateFilter("status", value === "all" ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Genre</label>
            <div className="grid grid-cols-2 gap-2">
              {genre.map((genreItem) => (
                <Button
                  key={genreItem.id}
                  variant={
                    searchParams.get("genre") === genreItem.id.toString()
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    updateFilter(
                      "genre",
                      searchParams.get("genre") === genreItem.id.toString()
                        ? null
                        : genreItem.id.toString()
                    )
                  }
                  className="text-xs"
                >
                  {genreItem.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {activeFilters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map(([key, value]) => (
                <Badge key={key + value} variant="secondary" className="text-xs">
                  {key}: {value}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-2"
                    onClick={() => updateFilter(key, null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
