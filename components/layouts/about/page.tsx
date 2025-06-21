import React from 'react'
import { Aboutchoose, Aboutcomplete, Aboutmodern, Aboutplatform, Aboutready, Abouttop, Aboutvalues } from './about.chunks'
import { MarqueeDemo } from './reviews.client'


export default function page() {
  return (
    <div>
      <Abouttop />
      <Aboutchoose />
      <Aboutplatform />
      <Aboutmodern />
      <Aboutvalues />
      <MarqueeDemo />
      <Aboutcomplete />
      <Aboutready />
    </div>
  )
}
