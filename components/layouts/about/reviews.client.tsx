"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
    {
        name: "Jack",
        username: "@jack",
        body: "This anime site is stunning. Clean and smooth!",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "I love how easy it is to find shows. Great work!",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "John",
        username: "@john",
        body: "Best anime hub I've seen recently. Fast and clean!",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Jane",
        username: "@jane",
        body: "Simple, effective, and stylish. Keep going!",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Jenny",
        username: "@jenny",
        body: "Dark UI is perfect for long watching sessions 😍",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "James",
        username: "@james",
        body: "Looks awesome on mobile. Very responsive design.",
        img: "https://avatar.vercel.sh/james",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 transition-colors",
                "border-white/10 bg-white/5 hover:bg-white/10",
                "dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <Image className="rounded-full" width="36" height="36" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-semibold text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs text-purple-400">{username}</p>
                </div>
            </div>
            <blockquote className="mt-3 text-sm text-white/80">{body}</blockquote>
        </figure>
    );
};

export function MarqueeDemo() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 lg:max-w-7xl mx-auto ">
            <Marquee pauseOnHover className="[--duration:18s] gap-4">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:18s] gap-4 mt-4">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
        </div>
    );
}
