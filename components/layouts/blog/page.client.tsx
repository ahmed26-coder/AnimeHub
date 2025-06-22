"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BlogItem {
  mal_id: number;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
}

interface BlogContentProps {
  articles: BlogItem[];
  error: string | null;
}

export default function BlogContent({ articles, error }: BlogContentProps) {
  const [likedItems, setLikedItems] = useState<number[]>([]);
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

  return (
    <>
      {error ? (
        <p className="text-center text-red-500">
          ⚠️ An error occurred while loading data: {error}
        </p>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-500">There is currently no data.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((item, index) => {
            const isLiked = likedItems.includes(item.mal_id);

            return (
              <Card
                key={index}
                className="overflow-hidden group py-0 flex flex-col h-full hover:shadow-lg transition-shadow"
              >
                <Image
                  src={item.thumbnail ?? "/placeholder.jpg"}
                  alt={item.title}
                  height={200}
                  width={400}
                  priority
                  className="object-cover group-hover:opacity-100 opacity-70 h-70 group-hover:scale-105 transition-transform duration-300 w-full"
                />
                <CardContent className="flex flex-col py-0 flex-grow justify-between p-4">
                  <div>
                    <h2 className="text-lg font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs text-gray-500 mb-2">
                      {new Date(item.pubDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm line-clamp-3 mb-4">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <Link
                      key={item.mal_id}
                      href={`/anime/${item.mal_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Read more →
                    </Link>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            onClick={() => toggleLike(item.mal_id)}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className={`p-1 rounded-full ${isLiked ? "text-red-500" : "text-gray-500"
                              }`}
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
