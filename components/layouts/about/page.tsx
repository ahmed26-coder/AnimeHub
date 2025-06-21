import React from 'react'
import { Aboutchoose, Aboutcomplete, Aboutmodern, Aboutplatform, Aboutready, Abouttop, Aboutvalues } from './about.chunks'
import { MarqueeDemo } from './reviews.client'
import TimelineSection from './abiut.client'


export default function page() {
  return (
    <div>
      <Abouttop />
      <Aboutchoose />
      <Aboutplatform />
      <Aboutmodern />
      <Aboutvalues />
      <MarqueeDemo />
      <TimelineSection />
      <Aboutcomplete />
      <Aboutready />
    </div>
  )
}
