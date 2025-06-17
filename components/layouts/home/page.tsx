import React from 'react'
import { HeroSection } from './home.chunks'
import { SearchSection } from '@/lib/search-section'
import { TrendingSection } from '@/lib/trending-section'
import { FeaturedAnime } from '@/lib/featured-anime'
import { SeasonalAnime } from '@/lib/seasonal-anime'
import { TopManga } from '@/lib/top-manga'
import { TopCharacters } from '@/lib/top-characters'
import { NewsSection } from '@/lib/news-section'
import { GenreSpotlight } from '@/lib/genre-spotlight'
import { AnimeStats } from '@/lib/anime-stats'
import { CommunitySection } from '@/lib/community-section'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SearchSection />
      <TrendingSection />
      <FeaturedAnime />
      <SeasonalAnime />
      <TopManga />
      <TopCharacters />
      <GenreSpotlight />
      <AnimeStats />
      <NewsSection />
      <CommunitySection />
    </div>
  )
}
