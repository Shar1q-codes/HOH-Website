import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import WhatIsHoH from './components/WhatIsHoH'
import WhyNow from './components/WhyNow'
import WhoGetsNominated from './components/WhoGetsNominated'
import TOTDifference from './components/TOTDifference'
import EventNight from './components/EventNight'
import CallToAction from './components/CallToAction'
import TheJury from './components/TheJury'
import OurGuests from './components/OurGuests'
import AdvisoryBoard from './components/AdvisoryBoard'
import Sponsors from './components/Sponsors'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <section id="hero">
          <Hero />
        </section>
        <section id="what-is-hoh">
          <WhatIsHoH />
        </section>
        <section id="why-now">
          <WhyNow />
        </section>
        <section id="nominate">
          <WhoGetsNominated />
        </section>
        <section id="tot-difference">
          <TOTDifference />
        </section>
        <section id="event-night">
          <EventNight />
        </section>
        <section id="jury">
          <TheJury />
        </section>
        <section id="guests">
          <OurGuests />
        </section>
        <section id="advisory-board">
          <AdvisoryBoard />
        </section>
        <section id="sponsors">
          <Sponsors />
        </section>
        <section id="cta">
          <CallToAction />
        </section>
        <Footer />
      </main>
    </div>
  )
}

export default App
