"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar, Users, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  score: number;
  year: number;
  members: number;
  genres: Array<{ name: string }>;
  type: string;
  status: string;
}

export function AnimeGrid() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const savedLikes = localStorage.getItem("likedItems");
    if (savedLikes) {
      setLikedItems(JSON.parse(savedLikes));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
  }, [likedItems]);

  const toggleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    async function fetchAnime() {
      setLoading(true);
      try {
        const genre = searchParams.get("genre");
        const type = searchParams.get("type");
        const status = searchParams.get("status");
        const order_by = searchParams.get("order_by") || "score";

        let url = `https://api.jikan.moe/v4/anime?page=${page}&limit=20&order_by=${order_by}&sort=desc&sfw=true`;

        if (genre) url += `&genres=${genre}`;
        if (type) url += `&type=${type}`;
        if (status) url += `&status=${status}`;

        const response = await fetch(url);
        const data = await response.json();

        setAnime(data.data);
        setHasNextPage(data.pagination.has_next_page);
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnime();
  }, [page, searchParams]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <Card key={i} className="overflow-hidden py-0">
            <div className="aspect-[3/4] bg-muted animate-pulse" />
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded animate-pulse mb-2" />
              <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {anime.map((item) => {
          const isLiked = likedItems.includes(item.mal_id);

          return (
            <Link key={item.mal_id} href={`/anime/${item.mal_id}`}>
              <Card className="h-full overflow-hidden py-0 hover:shadow-lg transition-shadow group">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={item.images.jpg.large_image_url || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/70 text-white">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {item.score || "N/A"}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 pt-0">
                  <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.year || "TBA"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {item.members ? (item.members / 1000).toFixed(0) + "K" : "0"}
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleLike(item.mal_id);
                            }}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className={`p-1 rounded-full ${isLiked ? "text-red-500" : "text-gray-500"}`}
                            aria-label="Like"
                          >
                            <Heart fill={isLiked ? "red" : "none"} size={18} />
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-white font-medium">
                            {isLiked ? "You like" : "Not decided yet"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.genres.slice(0, 2).map((genre) => (
                      <Badge key={genre.name} variant="outline" className="text-xs">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

              </Card>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">Page {page}</span>

        <Button
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNextPage}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
