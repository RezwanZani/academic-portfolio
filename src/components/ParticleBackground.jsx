import React, { useCallback, useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
const ParticleBackground = ({ darkMode }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Dark Mode (Space)
  const darkBg = "#0f172a";       // slate-900
  const darkParticle = "#38bdf8"; // sky-400
  const darkLinks = "#cbd5e1";    // slate-300

  // Light Mode (Clean - Green Theme)
  const lightBg = "#f8fafc";      // slate-50 (keep background neutral)
  const lightParticle = "#16a34a"; // green-600
  const lightLinks = "#86efac";   // green-300

  // We use useMemo to prevent the particles from reloading on every minor render
  const particlesConfig = useMemo(() => ({
    fullScreen: {
      enable: true, // This makes it cover the screen and follow the scroll
      zIndex: -1,   // Keeps it behind your text
    },
    background: {
      color: { value: darkMode ? darkBg : lightBg },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab", // The "Constellation" connection effect
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: { opacity: 0.3 },
        },
      },
    },
    particles: {
      // Dynamic Colors
      color: { value: darkMode ? darkParticle : lightParticle },
      links: {
        color: darkMode ? darkLinks : lightLinks,
        distance: 150,
        enable: true,
        opacity: darkMode ? 0.2 : 0.25, // Significantly lighter links
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "bounce" },
      },
      number: {
        density: { enable: true, area: 800 },
        value: 80, // High enough to look cool, low enough for performance
      },
      opacity: { value: 0.25 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), [darkMode]); // Re-calculate config only when theme changes

  return (
    <Particles
      key={darkMode ? 'particles-dark' : 'particles-light'}
      id='tsparticles-global'
      init={particlesInit}
      options={particlesConfig}
    />
  );
};

export default ParticleBackground;