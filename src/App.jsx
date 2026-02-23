import { useState, useEffect } from 'react'
import './index.css'
import SplashScreen from './components/SplashScreen'
import Cursor       from './components/Cursor'
import ProgressBar  from './components/ProgressBar'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import About        from './components/About'
import Timeline     from './components/Timeline'
import Projects     from './components/Projects'
import Stack        from './components/Stack'
import Contact      from './components/Contact'
import NotFound     from './components/NotFound'

function App() {
  const [splash, setSplash] = useState(true)
  const is404 = window.location.pathname !== '/'

  if (is404) {
    return (
      <>
        <Cursor />
        <NotFound />
      </>
    )
  }

  return (
    <>
      {splash && <SplashScreen onDone={() => setSplash(false)} />}
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main style={{ opacity: splash ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Stack />
        <Contact />
      </main>
    </>
  )
}

export default App