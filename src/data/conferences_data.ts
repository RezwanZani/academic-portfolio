import { title } from "process";

export const conferences = [
  {
    name: "Anatolian Rover Challenge 2025",
    location: "Ankara, Turkey",
    date: "2025",
    role: "Finalist & Vice Team Lead",
    presentation: "AAUB Rover 71: Operational Systems and Field-Level Performance",
    type: "International",
    status: "Completed",
    description: "An internationally benchmarked rover competition focused on space robotics, autonomous navigation, and planetary exploration challenges.",
    activities: [
      "Field-level Testing",
      "Technical Presentation",
      "System Problem Solving",
      "International Collaboration"
    ],
    recognition: "Finalist (11th Place Overall; 8th in Qualification)"
  },
  {
    name: "IEEE Region 10 Conference (TENCON) 2025",
    location: "Kota Kinabalu, Malaysia",
    date: "2025",
    role: "Oral Presenter",
    presentation: "LIFE-MAP: an Indigenous Biosignature Detection Protocol",
    type: "International",
    status: "Completed",
    description: "IEEE Region 10's premier annual technical conference covering a wide range of electrical, electronics, and computer engineering topics.",
    activities: [
      "Technical Paper Presentation",
      "Q&A Session",
      "Research Networking"
    ],
    recognition: "Certification of Two Conference Papers Presentation"
  },
  {
    name: "IEEE International Conference on Computer and Information Technology (ICCIT) 2025",
    location: "Dhaka, Bangladesh",
    date: "2025",
    role: "Oral Presenter",
    presentation: "Transfer Learning for Deep Feature Extraction in Automated Rock Classification",
    type: "International",
    status: "Upcoming",
    description: "A leading international forum for researchers to present their latest research and development results in all areas of Computer and Information Technology.",
    activities: [
      "Oral Presentation",
      "Peer Review Engagement",
      "Technical Discussion"
    ],
    recognition: "Accepted for Publication"
  },
  {
    name: "IEEE Region 10 Symposium (TENSYMP) 2024",
    location: "New Delhi, India",
    date: "2024",
    role: "Oral Presenter",
    presentation: "Electro-Mechanical Design Analysis and Implementation of an Indigenous Mars Rover",
    type: "International",
    status: "Completed",
    description: "An international symposium providing a platform for researchers and engineers to share knowledge and discuss innovations in technology.",
    activities: [
      "Technical Presentation",
      "Robotics Design Showcase",
      "Professional Networking"
    ],
    recognition: "IEEE TENSYMP'24 Certificate of Presentation"
  },
  {
    name: "Undergraduate Thesis Presentation 2026",
    location: "AAUB, Dhaka",
    date: "January 2026",
    role: "Oral & Poster Presenter",
    presentation: "Privacy Preserving Automatic Modulation Recognition for UAV Networks using Distributed Learning",
    type: "Institutional",
    status: "Completed",
    description: "University-wide thesis showcase for graduating Avionics Engineering students to present their research findings to faculty and industry experts.",
    activities: [
      "Thesis Poster Presentation",
      "Technical Deep-Dive",
      "Faculty Feedback Session"
    ],
    recognition: "Best Thesis Poster Presentation Award"
  }
];

export const conferenceSummary = [
    {title: "Total Conferences", value: conferences.length},
    {title: "International Conferences", value: conferences.filter(c => c.type === "International").length},
    {title: "Presentations Given", value: conferences.length},
    {title: "Awards & Recognitions", value: conferences.filter(c => c.recognition).length}
]