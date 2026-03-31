import { Trophy, Star, Settings, Mic, Presentation, FileText, Users, Cpu } from 'lucide-react';

export const activitiesData = {
  competitions: [
    {
      title: "Anatolian Rover Challenge 2025",
      year: 2025,
      role: "Finalist (Ranked 11th)",
      description: "Represented AAUB and Bangladesh in Turkey, securing a global ranking in the team's inaugural participation.",
      icon: Trophy
    },
    {
      title: "International Astronomy and Astrophysics Competition (IAAC)",
      year: 2023,
      role: "Silver Honor",
      description: "Achieved Silver Honor in the final round of this global competition.",
      icon: Star
    },
    {
      title: "ROBOVERSE 0.1: Intra-University Robotics Competition",
      year: 2024,
      role: "Organizer",
      description: "Coordinated and executed an intra-university robotics competition at BSMRAAU.",
      icon: Settings
    },
    {
      title: "Inter-Department Debate Championship",
      year: 2025,
      role: "Organizer",
      description: "Managed planning, registration, and logistics for AAUB's inaugural debate championship featuring over 10 teams.",
      icon: Mic
    }
  ],
  conferences: [
    {
      title: "IEEE Region 10 Conference (TENCON)",
      year: 2025,
      location: "Kota Kinabalu, Malaysia",
      role: "Presenter",
      description: "Presented two research papers focused on biosignature detection and modular robotic arm design.",
      icon: Presentation
    },
    {
      title: "IEEE International Conference on Computer and Information Technology (ICCIT)",
      year: 2025,
      role: "Presenter",
      description: "Presented research on transfer learning for deep feature extraction in automated rock classification.",
      icon: FileText
    },
    {
      title: "IEEE Region 10 Symposium (TENSYMP)",
      year: 2024,
      location: "New Delhi, India",
      role: "Presenter",
      description: "Presented work on the electro-mechanical design analysis and implementation of an indigenous Mars rover.",
      icon: Users
    },
    {
      title: "National Semiconductor Symposium (BEAR Summit)",
      year: 2025,
      role: "BEAR Patron",
      description: "Participated in national policy dialogues on AI, robotics, and semiconductor innovation under the EDGE Project.",
      icon: Cpu
    }
  ]
};