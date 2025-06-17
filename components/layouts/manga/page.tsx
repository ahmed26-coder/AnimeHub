import React, { Suspense } from 'react'
import MangaPage from './manga.chunks'

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading manga...</div>}>
      <MangaPage />
    </Suspense>
  )
}
