import { Sword, Heart, Zap, Sparkles, Ghost, Smile, Drama, Rocket } from "lucide-react"

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/anime", label: "Anime" },
  { href: "/manga", label: "Manga" },
  { href: "/characters", label: "Characters" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export const genres = [
  {
    id: 1,
    name: "Action",
    icon: Sword,
    description: "High-energy series with intense battles and thrilling sequences",
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    count: "12,000+",
  },
  {
    id: 22,
    name: "Romance",
    icon: Heart,
    description: "Heartwarming love stories and romantic relationships",
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    count: "8,500+",
  },
  {
    id: 37,
    name: "Supernatural",
    icon: Sparkles,
    description: "Mystical powers, magic, and otherworldly phenomena",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    count: "6,200+",
  },
  {
    id: 4,
    name: "Comedy",
    icon: Smile,
    description: "Hilarious moments and laugh-out-loud entertainment",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    count: "9,800+",
  },
  {
    id: 14,
    name: "Horror",
    icon: Ghost,
    description: "Spine-chilling stories that will keep you on edge",
    color: "text-gray-500",
    bgColor: "bg-gray-50 dark:bg-gray-950/20",
    count: "2,100+",
  },
  {
    id: 8,
    name: "Drama",
    icon: Drama,
    description: "Emotional narratives with deep character development",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    count: "7,300+",
  },
  {
    id: 24,
    name: "Sci-Fi",
    icon: Rocket,
    description: "Futuristic worlds and advanced technology",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
    count: "4,600+",
  },
  {
    id: 10,
    name: "Fantasy",
    icon: Zap,
    description: "Magical realms and fantastical adventures",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    count: "5,900+",
  },
]


export const newsItems = [
  {
    id: 1,
    title: "New Anime Season Announcements for 2024",
    excerpt:
      "Discover the most anticipated anime series coming this year, including sequels to popular franchises and exciting new original works.",
    date: "2024-01-15",
    category: "Announcements",
    readTime: "3 min read",
  },
  {
    id: 2,
    title: "Top 10 Manga Adaptations to Watch",
    excerpt:
      "From beloved classics to recent hits, these manga-to-anime adaptations are must-watches for any anime fan.",
    date: "2024-01-12",
    category: "Reviews",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Studio Spotlight: Animation Trends in 2024",
    excerpt: "Exploring the latest animation techniques and artistic styles that are defining modern anime production.",
    date: "2024-01-10",
    category: "Industry",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "Character Analysis: Most Popular Protagonists",
    excerpt: "Deep dive into what makes certain anime characters resonate with audiences worldwide.",
    date: "2024-01-08",
    category: "Analysis",
    readTime: "6 min read",
  },
]


export const genre = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 4, name: "Comedy" },
  { id: 8, name: "Drama" },
  { id: 10, name: "Fantasy" },
  { id: 14, name: "Horror" },
  { id: 22, name: "Romance" },
  { id: 24, name: "Sci-Fi" },
  { id: 36, name: "Slice of Life" },
  { id: 37, name: "Supernatural" },
]

export const types = ["TV", "Movie", "OVA", "Special", "ONA", "Music"]
export const statuses = ["airing", "complete", "upcoming"]
export const orderOptions = [
  { value: "score", label: "Score" },
  { value: "popularity", label: "Popularity" },
  { value: "start_date", label: "Start Date" },
  { value: "title", label: "Title" },
]

export const popularSearches = [
  "Naruto",
  "One Piece",
  "Attack on Titan",
  "Demon Slayer",
  "My Hero Academia",
  "Dragon Ball",
  "Death Note",
  "One Punch Man",
]



export const type = ["Manga", "Novel", "Light Novel", "One-shot", "Doujinshi", "Manhwa", "Manhua"]
export const statuse = ["publishing", "complete", "hiatus", "discontinued", "not_yet_published"]
