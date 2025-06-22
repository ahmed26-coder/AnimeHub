"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

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
          {articles.map((item, index) => (
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
                  <h2 className="text-lg font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors ">{item.title}</h2>
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(item.pubDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm line-clamp-3 mb-4">{item.description}</p>
                </div>
                <Link key={item.mal_id} href={`/anime/${item.mal_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm mt-auto"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
