import React from 'react'
import { Aboutchoose, Aboutcomplete, Aboutmodern, Aboutplatform, Aboutready, Abouttop, Aboutvalues } from './about.chunks'


export default function page() {
  return (
    <div>
      <Abouttop />
      <Aboutchoose />
      <Aboutplatform />
      <Aboutmodern />
      <Aboutvalues />
      <Aboutcomplete />
      <Aboutready />
    </div>
  )
}
