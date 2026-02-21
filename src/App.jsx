import React from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Trailer from './sections/Trailer'
import Characters from './sections/Characters'
import Countdown from './sections/Countdown'
import PreRegister from './sections/PreRegister'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Trailer />
        <Characters />
        <Countdown />
        <PreRegister />
      </main>
      <Footer />
    </div>
  )
}
