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
        {/* Decoration: Faint Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="container mx-auto max-w-[1400px] xl:max-w-[1200px] 2xl:max-w-[1280px] relative z-10"></div>

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