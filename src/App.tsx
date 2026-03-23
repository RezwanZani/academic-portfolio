import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Publications } from './components/Publications';
import { Conferences } from './components/Conferences';
import { Journey } from './components/Journey';
import { Contact } from './components/Contact';

/*
 * Github: https://github.com/RezwanZani/academic-portfolio
 * Original design by Ashish Gautam.
 * Source: https://www.figma.com/community/file/1535220348867490165
 * Licensed under CC BY 4.0.
 * Adapted and customized by Md. Rezwan Zani for Tyseer Ninad.
 * Developer: Md. Rezwan Zani (https://rezwanzani.me)
 * Copyright © 2026 Tyseer Ninad. All rights reserved.
 */

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
        <Journey />
        <Contact />
      </main>
    </div>
  );
}

/*
 * Github: https://github.com/RezwanZani/academic-portfolio
 * Original design by Ashish Gautam.
 * Source: https://www.figma.com/community/file/1535220348867490165
 * Licensed under CC BY 4.0.
 * Adapted and customized by Md. Rezwan Zani for Tyseer Ninad.
 * Developer: Md. Rezwan Zani (https://rezwanzani.me)
 * Copyright © 2026 Tyseer Ninad. All rights reserved.
 */