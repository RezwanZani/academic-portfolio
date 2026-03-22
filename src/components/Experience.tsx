import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, MapPin, Building, GraduationCap, Users, Code, Award } from 'lucide-react';
import { motion } from 'motion/react';

export function Experience() {
  const experiences = {
    academic: [
      {
        title: "Graduate Research Assistant",
        organization: "[University Name] - [Department]",
        location: "[City, State]",
        period: "August 2021 - Present",
        type: "Full-time",
        supervisor: "Dr. [Supervisor Name]",
        description: "Conducting independent research on [research topic] under the supervision of leading faculty members. Responsible for literature review, data collection, analysis, and manuscript preparation.",
        responsibilities: [
          "Design and execute research experiments using [methodology/tools]",
          "Analyze complex datasets using [statistical software/programming languages]",
          "Collaborate with interdisciplinary research teams on multiple projects",
          "Present research findings at department seminars and conferences",
          "Mentor undergraduate students in research methodologies"
        ],
        skills: ["Research Design", "Data Analysis", "Statistical Modeling", "Academic Writing", "Project Management"],
        achievements: [
          "Published 3 peer-reviewed articles as first author",
          "Secured $15,000 in research funding",
          "Mentored 8 undergraduate researchers"
        ]
      },
      {
        title: "Research Intern",
        organization: "[External Research Institution/Lab]",
        location: "[City, State/Country]",
        period: "Summer 2023",
        type: "Internship",
        supervisor: "Dr. [Supervisor Name]",
        description: "Summer research internship focusing on collaborative project between universities. Gained exposure to advanced research techniques and international research collaboration.",
        responsibilities: [
          "Assisted in designing and conducting experiments",
          "Learned advanced laboratory/computational techniques",
          "Participated in weekly research meetings and seminars",
          "Contributed to research publication preparation"
        ],
        skills: ["Laboratory Techniques", "International Collaboration", "Cross-cultural Communication", "Technical Writing"],
        achievements: [
          "Co-authored research paper accepted at international conference",
          "Developed proficiency in [specific technique/software]"
        ]
      }
    ],
    teaching: [
      {
        title: "Teaching Assistant",
        organization: "[University Name] - [Course Name/Number]",
        location: "[City, State]",
        period: "January 2022 - December 2023",
        type: "Part-time",
        supervisor: "Prof. [Course Instructor]",
        description: "Teaching assistant for undergraduate course in [subject area]. Responsible for leading discussion sections, grading assignments, and providing student support.",
        responsibilities: [
          "Led weekly discussion sections for 25-30 students",
          "Graded assignments, exams, and provided detailed feedback",
          "Held regular office hours for student consultations",
          "Assisted in curriculum development and course material preparation",
          "Supervised laboratory sessions and guided hands-on learning"
        ],
        skills: ["Public Speaking", "Curriculum Development", "Student Assessment", "Mentoring", "Communication"],
        achievements: [
          "Received Teaching Excellence Award 2023",
          "Maintained 4.8/5.0 student evaluation rating",
          "Developed innovative teaching materials used department-wide"
        ]
      },
      {
        title: "Private Tutor",
        organization: "Independent",
        location: "[City, State]",
        period: "September 2020 - Present",
        type: "Part-time",
        description: "Providing one-on-one and small group tutoring for undergraduate students in [subjects]. Focus on helping students develop critical thinking and problem-solving skills.",
        responsibilities: [
          "Assess individual student learning needs and adapt teaching methods",
          "Develop customized learning materials and practice problems",
          "Track student progress and communicate with parents/advisors",
          "Prepare students for exams and major assessments"
        ],
        skills: ["Personalized Instruction", "Learning Assessment", "Patience", "Adaptability"],
        achievements: [
          "Helped 15+ students improve grades by average of 1.2 GPA points",
          "100% student satisfaction rate"
        ]
      }
    ],
    industry: [
      {
        title: "[Job Title]",
        organization: "[Company Name]",
        location: "[City, State]",
        period: "Summer 2022",
        type: "Internship",
        supervisor: "[Supervisor Name]",
        description: "Summer internship in [industry/department] focused on applying academic knowledge to real-world business challenges. Gained valuable industry experience and professional skills.",
        responsibilities: [
          "Conducted data analysis for [specific business problem]",
          "Collaborated with cross-functional teams on strategic projects",
          "Prepared presentations for senior management",
          "Participated in professional development workshops"
        ],
        skills: ["Business Analytics", "Team Collaboration", "Professional Communication", "Strategic Thinking"],
        achievements: [
          "Project recommendations implemented company-wide",
          "Received offer for return internship"
        ]
      },
      {
        title: "[Previous Job Title]",
        organization: "[Previous Company]",
        location: "[City, State]",
        period: "June 2019 - July 2021",
        type: "Full-time",
        description: "Full-time position before starting PhD program. Gained valuable professional experience and developed skills that enhance academic research capabilities.",
        responsibilities: [
          "[Key responsibility 1]",
          "[Key responsibility 2]",
          "[Key responsibility 3]",
          "[Key responsibility 4]"
        ],
        skills: ["Project Management", "Client Relations", "Technical Skills", "Leadership"],
        achievements: [
          "Promoted within 18 months",
          "Led team of 5 junior staff members"
        ]
      }
    ],
    service: [
      {
        title: "Graduate Student Representative",
        organization: "[University Department] Graduate Committee",
        location: "[University Name]",
        period: "September 2023 - Present",
        type: "Volunteer",
        description: "Elected representative serving on departmental graduate committee, advocating for graduate student interests and contributing to policy decisions.",
        responsibilities: [
          "Attend monthly committee meetings and represent student concerns",
          "Review and provide feedback on graduate program policies",
          "Organize graduate student social and professional events",
          "Mentor incoming graduate students"
        ],
        skills: ["Leadership", "Policy Analysis", "Event Organization", "Advocacy"]
      },
      {
        title: "Peer Reviewer",
        organization: "[Journal Names]",
        location: "Remote",
        period: "2023 - Present",
        type: "Volunteer",
        description: "Serving as peer reviewer for academic journals in [field]. Contributing to the academic community through rigorous manuscript evaluation.",
        responsibilities: [
          "Review submitted manuscripts for scientific rigor and clarity",
          "Provide constructive feedback to authors",
          "Meet editorial deadlines and maintain review quality"
        ],
        skills: ["Critical Analysis", "Academic Writing", "Time Management", "Professional Ethics"]
      },
      {
        title: "Conference Volunteer",
        organization: "[Conference Name] 2023",
        location: "[Conference Location]",
        period: "March 2023",
        type: "Volunteer",
        description: "Volunteer coordinator for international academic conference, gaining experience in event management and professional networking.",
        responsibilities: [
          "Coordinate registration and check-in processes",
          "Assist speakers with technical setup and logistics",
          "Guide attendees and facilitate networking sessions"
        ],
        skills: ["Event Management", "Customer Service", "Problem Solving", "Networking"]
      }
    ]
  };

  const ExperienceCard = ({ experience, showSupervisor = true, index = 0 }: { experience: any, showSupervisor?: boolean, index?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <Card className="hover:shadow-lg transition-shadow h-full">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="mb-2">{experience.title}</CardTitle>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Building size={16} />
                <span>{experience.organization}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span>{experience.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span>{experience.period}</span>
              </div>
              {showSupervisor && experience.supervisor && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={16} />
                  <span>Supervisor: {experience.supervisor}</span>
                </div>
              )}
            </div>
          </div>
          <Badge variant="outline" className="self-start">
            {experience.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700 mb-4">
          {experience.description}
        </p>
        
        {experience.responsibilities && (
          <div className="mb-4">
            <h4 className="mb-2">Key Responsibilities</h4>
            <ul className="text-gray-700 text-sm space-y-1">
              {experience.responsibilities.map((resp: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {experience.skills && (
          <div className="mb-4">
            <h4 className="mb-2">Skills Developed</h4>
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill: string, skillIndex: number) => (
                <motion.div
                  key={skillIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {experience.achievements && (
          <div>
            <h4 className="mb-2 flex items-center gap-2">
              <Award size={16} className="text-amber-600" />
              Key Achievements
            </h4>
            <ul className="text-gray-700 text-sm space-y-1">
              {experience.achievements.map((achievement: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
    </motion.div>
  );

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Professional Experience</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my academic, teaching, industry, and service experiences 
            that have shaped my professional development and research expertise.
          </p>
        </div>

        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="academic" className="flex items-center gap-2">
              <GraduationCap size={16} />
              <span className="hidden sm:inline">Academic</span>
            </TabsTrigger>
            <TabsTrigger value="teaching" className="flex items-center gap-2">
              <Users size={16} />
              <span className="hidden sm:inline">Teaching</span>
            </TabsTrigger>
            <TabsTrigger value="industry" className="flex items-center gap-2">
              <Building size={16} />
              <span className="hidden sm:inline">Industry</span>
            </TabsTrigger>
            <TabsTrigger value="service" className="flex items-center gap-2">
              <Award size={16} />
              <span className="hidden sm:inline">Service</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academic">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="mb-2">Academic & Research Experience</h3>
                <p className="text-gray-600">
                  Research positions and academic roles that have contributed to my scholarly development
                </p>
              </div>
              {experiences.academic.map((exp, index) => (
                <ExperienceCard key={index} experience={exp} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="teaching">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="mb-2">Teaching Experience</h3>
                <p className="text-gray-600">
                  Educational roles and instructional experience across different academic levels
                </p>
              </div>
              {experiences.teaching.map((exp, index) => (
                <ExperienceCard key={index} experience={exp} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="industry">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="mb-2">Industry Experience</h3>
                <p className="text-gray-600">
                  Professional positions and internships that provide practical application of academic knowledge
                </p>
              </div>
              {experiences.industry.map((exp, index) => (
                <ExperienceCard key={index} experience={exp} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="service">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="mb-2">Service & Leadership</h3>
                <p className="text-gray-600">
                  Volunteer positions and leadership roles contributing to the academic and professional community
                </p>
              </div>
              {experiences.service.map((exp, index) => (
                <ExperienceCard key={index} experience={exp} showSupervisor={false} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Experience Summary */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center mb-8">Experience Summary</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "3+", label: "Years Research Experience" },
              { number: "2+", label: "Years Teaching Experience" },
              { number: "50+", label: "Students Mentored" },
              { number: "5+", label: "Leadership Roles" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="text-2xl mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}