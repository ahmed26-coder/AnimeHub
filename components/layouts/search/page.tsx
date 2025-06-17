import React from 'react'
import { Suspense } from "react"
import SearchPage from './search.client'

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading search results...</div>}>
      <SearchPage />
    </Suspense>
  )
}
