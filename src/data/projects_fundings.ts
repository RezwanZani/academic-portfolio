import { Radio, Activity, Home, Navigation, Cpu, Telescope, Rocket } from 'lucide-react';

export const projectsAndFundings = {
  courseProjects: [
    {
      title: "Evolution of Wireless Communication and the Role of GFDM in 5G Networks",
      year: 2025,
      description: "Analyzed GFDM as a flexible 5G waveform using MATLAB, demonstrating superior error performance and reduced spectral leakage compared to OFDM.",
      icon: Radio
    },
    {
      title: "Quantifying Cognitive Stress: EEG Based Assessment for Aviation Professionals",
      year: 2024,
      description: "Developed a 1D Convolutional Neural Network (CNN) to assess cognitive stress in aviation contexts using neurophysiological EEG signals.",
      icon: Activity
    },
    {
      title: "Home Automation and Security System Using Logic Gates",
      year: 2023,
      description: "Designed a hardware-based security system utilizing digital logic, featuring binary keypad locks and intrusion detection through modular ICs.",
      icon: Home
    }
  ],
  researchGrants: [
    {
      title: "Integrated Communication and Autonomous Navigation System for a Remotely Operated Vehicle (ROV)",
      year: 2024,
      amount: "BDT 210,000",
      principalInvestigator: "Dr. S. M. Sadakatul Bari",
      icon: Navigation
    },
    {
      title: "Design & Development of an Indigenous Modular 5-Degree Of Freedom Robotic Arm",
      year: 2024,
      amount: "BDT 350,000",
      principalInvestigator: "Air Cdre (Retd) Md Afzal Hossain",
      icon: Cpu
    },
    {
      title: "Design & Development of a Scientific Exploration and Environmental Analysis Module",
      year: 2024,
      amount: "BDT 210,000",
      principalInvestigator: "Assistant Professor Md Samin Rahman",
      icon: Telescope
    },
    {
      title: "Designing and Developing an Indigenous Mars Rover for Inter-planetary Scientific Exploration",
      year: 2023,
      amount: "BDT 210,000",
      principalInvestigator: "Air Cdre (Retd) Md Afzal Hossain",
      icon: Rocket
    }
  ]
};
