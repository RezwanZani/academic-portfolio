import { Award, BookOpen, Users, Target } from "lucide-react";

export const milestones = [
  {
    title: "Avionics Engineering Program Admission",
    date: "January 2022",
    status: "completed",
    description: "Admitted to the Bachelor of Science in Avionics Engineering at AAUB."
  },
  {
    title: "Academic Merit Scholarships",
    date: "2023 - 2025",
    status: "completed",
    description: "Awarded Vice Chancellor and General Scholarships for consistent high GPA performance."
  },
  {
    title: "AAUB Rover 71 Project Launch",
    date: "October 2023",
    status: "completed",
    description: "Founded and led end-to-end technical and administrative operations for the rover team."
  },
  {
    title: "Anatolian Rover Challenge Finals",
    date: "2025",
    status: "completed",
    description: "Represented Bangladesh as a global finalist (11th place) in Ankara, Turkey."
  },
  {
    title: "Undergraduate Thesis Defense",
    date: "January 2026",
    status: "completed",
    description: "Successfully defended thesis on privacy-preserving AMR for UAV networks."
  },
  {
    title: "BSCL Technology Internship",
    date: "February 2026 - Present",
    status: "in-progress",
    description: "Supporting satellite service planning and ground segment architecture activities."
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

export const achievements = [
  {
    icon: Award,
    title: "Best Thesis Poster Presentation",
    description: "Awarded for the undergraduate thesis on UAV network privacy and distributed learning (2026)."
  },
  {
    icon: BookOpen,
    title: "Merit-Based Scholarships",
    description: "Recipient of Vice Chancellor and General Scholarships for academic excellence."
  },
  {
    icon: Users,
    title: "Global Robotics Ranking",
    description: "Secured 8th and 11th global rankings in the Anatolian Rover Challenge 2025."
  },
  {
    icon: Target,
    title: "IEEE Conference Publications",
    description: "Authored 6 IEEE conference papers on robotics, communication, and deep learning."
  }
];

export const researchEnvironment = {
    centerName: "Communication Laboratory",
    university: "Aviation and Aerospace University of Bangladesh (AAUB)",
    department: "Department of Avionics Engineering",
    photo: "/photo/my_lab.png"
};