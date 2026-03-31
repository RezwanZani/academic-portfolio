import { Award, BookOpen, Users, Target, Trophy, Medal, GraduationCap, Star, Cpu } from "lucide-react";

export const milestones = [
  {
    title: "BSCL Technology Internship",
    date: "February 2026 - Present",
    status: "in-progress",
    description: "Supporting satellite service planning and ground segment architecture activities."
  },
  {
    title: "Undergraduate Thesis Defense",
    date: "January 2026",
    status: "completed",
    description: "Successfully defended thesis on privacy-preserving AMR for UAV networks."
  },
  {
    title: "Anatolian Rover Challenge Finals",
    date: "2025",
    status: "completed",
    description: "Represented Bangladesh as a global finalist (11th place) in Ankara, Turkey."
  },
  {
    title: "AAUB Rover 71 Project Launch",
    date: "October 2023",
    status: "completed",
    description: "Founded and led end-to-end technical and administrative operations for the rover team."
  },
  {
    title: "Academic Merit Scholarships",
    date: "2023 - 2025",
    status: "completed",
    description: "Awarded Vice Chancellor and General Scholarships for consistent high GPA performance."
  },
  {
    title: "Avionics Engineering Program Admission",
    date: "January 2022",
    status: "completed",
    description: "Admitted to the Bachelor of Science in Avionics Engineering at AAUB."
  }
];

export const currentResearch = {
  title: "Privacy Preserving Automatic Modulation Recognition for UAV Networks using Distributed Learning",
  advisor: "Air Cdre Mohammed Akhter Jamil, PhD",
  committee: [
    "Air Cdre Mohammed Akhter Jamil, PhD (Supervisor)",
    "Associate Professor Md Sakir Hossain, PhD (Ex-Supervisor)"
  ],
  abstract: "This thesis proposes a privacy-preserving solution for Automatic Modulation Recognition (AMR) in UAV-assisted networks, leveraging decentralized federated learning (DFL) and the OTFS Delay-Doppler domain. The framework optimizes both communication and privacy while significantly enhancing AMR performance.",
  objectives: [
    "Develop a privacy-preserving solution for AMR in UAV-assisted networks",
    "Leverage decentralized federated learning (DFL) and OTFS Delay-Doppler domain",
    "Optimize communication and privacy efficiency in networked systems",
    "Achieve high-accuracy signal classification (up to 100% at 6 dB SNR)"
  ],
  progress: 100
};

export const awardsAndAchievements = [
  {
    title: "Best Thesis Poster Presentation",
    year: 2026,
    issuer: "Aviation and Aerospace University, Bangladesh",
    description: "Awarded for the undergraduate thesis presentation on privacy-preserving Automatic Modulation Recognition.",
    icon: Award
  },
  {
    title: "Finalist (11th) - Anatolian Rover Challenge",
    year: 2025,
    issuer: "Anatolian Rover Challenge, Turkey",
    description: "Secured a global ranking of 11th in the final round and 8th in the qualification round in the team's first participation.",
    icon: Trophy
  },
  {
    title: "Silver Honor - IAAC",
    year: 2023,
    issuer: "Int. Astronomy and Astrophysics Competition",
    description: "Achieved Silver Honor in the final round of this international competition.",
    icon: Medal
  },
  {
    title: "Merit Scholarships",
    year: "2022 - 2025",
    issuer: "AAUB",
    description: "Awarded Vice Chancellor and General Scholarships for consistent high academic performance (GPA up to 3.89/4.00).",
    icon: GraduationCap
  },
  {
    title: "Certification of Excellence (Vice Team Lead)",
    year: 2025,
    issuer: "AAUB Rover 71",
    description: "Recognized for leadership and operational management of the indigenous Mars Rover project.",
    icon: Star
  },
  {
    title: "BEAR Patron",
    year: 2025,
    issuer: "BEAR Summit & National Semiconductor Symposium",
    description: "Selected to participate in national policy dialogues on AI, robotics, and semiconductor innovation under the EDGE Project.",
    icon: Cpu
  }
];

export const researchEnvironment = {
    centerName: "Communication Laboratory",
    university: "Aviation and Aerospace University of Bangladesh (AAUB)",
    department: "Department of Avionics Engineering",
    photo: "/photo/my_lab.png"
};