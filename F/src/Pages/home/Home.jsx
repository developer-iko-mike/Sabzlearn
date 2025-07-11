import React from 'react'
import './home.css'
import Landing from './Components/landing/Landing'
import Courses from './Components/courses/Courses'
import AboutUs from './Components/aboutUs/AboutUs'
import Popular from './Components/popular/Popular'
import Presell from './Components/presell/Presell'
import Articles from './Components/articles/Articles'

export default function Home() {
  return (
    <>
      <Landing/>
      <Courses/>
      <AboutUs/>
      <Popular/>
      <Presell/>
      <Articles/>
    </>
  )
}
