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
import { X, Filter } from "lucide-react"
import { genre, orderOptions, statuses, types } from "@/constent"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

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
    <div className="space-y-4 md:space-y-6">
      <div className="block md:hidden">
        <Dialog >
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-center">
              <Filter className="h-4 w-4 mr-2" />
              filter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90%] max-h-[80vh] overflow-y-auto rounded-lg p-4">
            <div className="space-y-4 pt-7">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Filters</h3>
                {activeFilters.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    <X className="h-8 w-8 mr-2 text-white " />
                    Clear all
                  </Button>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Sort by</label>
                <Select
                  value={searchParams.get("order_by") || "score"}
                  onValueChange={(value) => updateFilter("order_by", value)}
                >
                  <SelectTrigger className="text-sm h-9">
                    <SelectValue placeholder="The result" />
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

              <div>
                <label className="text-sm font-medium mb-1 block">Type</label>
                <Select
                  value={searchParams.get("type") || "all"}
                  onValueChange={(value) =>
                    updateFilter("type", value === "all" ? null : value)
                  }
                >
                  <SelectTrigger className="text-sm h-9">
                    <SelectValue placeholder="All kinds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All kinds</SelectItem>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">the condition</label>
                <Select
                  value={searchParams.get("status") || "all"}
                  onValueChange={(value) =>
                    updateFilter("status", value === "all" ? null : value)
                  }
                >
                  <SelectTrigger className="text-sm h-9">
                    <SelectValue placeholder="All cases" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All cases</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Classification</label>
                <div className="flex flex-wrap gap-1.5">
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
                      className="text-xs px-2 py-1"
                    >
                      {genreItem.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="hidden md:block">
        <Card className=" ">
          <CardHeader className="flex flex-row items-center justify-between px-4">
            <CardTitle className="text-lg">Filters</CardTitle>
            {activeFilters.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear all
              </Button>
            )}
          </CardHeader>

          <CardContent className="space-y-4 px-4 pb-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Sort by</label>
              <Select
                value={searchParams.get("order_by") || "score"}
                onValueChange={(value) => updateFilter("order_by", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="The result" />
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

            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <Select
                value={searchParams.get("type") || "all"}
                onValueChange={(value) =>
                  updateFilter("type", value === "all" ? null : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">the condition</label>
              <Select
                value={searchParams.get("status") || "all"}
                onValueChange={(value) =>
                  updateFilter("status", value === "all" ? null : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All cases" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All cases</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Classification</label>
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
      </div>

      {activeFilters.length > 0 && (
        <Card className="max-w-full flex overflow-hidden">
          <CardHeader className="py-2 px-4 flex justify-between items-center">
            <CardTitle className="text-sm">Active filters</CardTitle>
            {activeFilters.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-8 w-8 mr-2 text-white " />
                Clear all
              </Button>
            )}
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex flex-wrap gap-1.5">
              {activeFilters.map(([key, value]) => (
                <Badge key={key + value} variant="secondary" className="text-xs py-0.5 px-2">
                  {key}: {value}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => updateFilter(key, null)}
                  >
                    <X className="h-2.5 w-2.5" />
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