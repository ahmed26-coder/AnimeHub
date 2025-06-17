import React, { Suspense } from 'react'
import AnimePage from './anime.client'

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading anime...</div>}>
      <AnimePage />
    </Suspense>
  )
}
