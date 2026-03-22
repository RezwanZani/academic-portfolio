import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Publications } from './components/Publications';
import { Conferences } from './components/Conferences';
import { PhdJourney } from './components/PhdJourney';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Education />
        <Experience />
        <Publications />
        <Conferences />
        <PhdJourney />
        <Contact />
      </main>
    </div>
  );
}