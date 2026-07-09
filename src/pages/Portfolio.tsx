import React from 'react';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { Skills } from '../components/Skills';
import { Education } from '../components/Education';
import { ResearchInterests } from '../components/ResearchInterests';
import { Experience } from '../components/Experience';
import { Publications } from '../components/Publications';
import { ProjectsFundings } from '../components/ProjectsFundings';
import { Activities } from '../components/Activities';
import { Journey } from '../components/Journey';
import { Contact } from '../components/Contact';
import ParticleBackground from '../components/ParticleBackground';
import { PortfolioProvider, usePortfolio } from '../contexts/PortfolioContext';
import { PortfolioSkeleton } from '../components/PortfolioSkeleton';

const PortfolioContent: React.FC = () => {
  const { loading } = usePortfolio();

  if (loading) {
    return <PortfolioSkeleton />;
  }

  return (
    <div className="min-h-screen bg-transparent relative">
      <Navigation />
      <main>
        {/* Decoration: Faint Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="container mx-auto max-w-[1400px] xl:max-w-[1200px] 2xl:max-w-[1280px] relative z-10"></div>
        <ParticleBackground darkMode={false} />

        <Hero />
        <Skills />
        <Education />
        <ResearchInterests />
        <Publications />
        <ProjectsFundings />
        <Experience />
        <Activities />
        <Journey />
        <Contact />
      </main>
    </div>
  );
};

export const Portfolio: React.FC = () => {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
};
