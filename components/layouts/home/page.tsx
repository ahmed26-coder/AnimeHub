import React from 'react'
import { HeroSection } from './home.chunks'
import { SearchSection } from '@/components/layouts/search/search-section'
import { TrendingSection } from '@/components/layouts/home/trending-section'
import { FeaturedAnime } from '@/components/layouts/home/featured-anime'
import { SeasonalAnime } from '@/components/layouts/home/seasonal-anime'
import { TopManga } from '@/components/layouts/home/top-manga'
import { TopCharacters } from '@/components/layouts/home/top-characters'
import { NewsSection } from '@/components/layouts/home/news-section'
import { GenreSpotlight } from '@/components/layouts/home/genre-spotlight'
import { AnimeStats } from '@/components/layouts/anime/anime-stats'
import { CommunitySection } from '@/components/layouts/home/community-section'
import WelcomeDialog from './welcomedialog'

export default function Home() {
  return (
    <div>
      <WelcomeDialog />
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
