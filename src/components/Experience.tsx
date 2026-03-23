import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, MapPin, Building, GraduationCap, Users, Code, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { experiences, experienceSummary } from '../data/experience_data';

export function Experience() {
  

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
            <CardTitle className="mb-2 text-lg font-semibold text-primary">{experience.title}</CardTitle>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Building size={16} />
                <span className="font-semibold">{experience.organization}</span>
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
            <h4 className="mb-2 text-green-600">Key Responsibilities</h4>
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
            <h4 className="mb-2 text-green-600">Skills Developed</h4>
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
            <h4 className="mb-2 flex items-center gap-2 text-green-600">
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
          <h2 className="mb-4 text-3xl font-bold text-primary">Professional Experience</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my academic, teaching, industry, and service experiences 
            that have shaped my professional development and research expertise.
          </p>
        </div>

        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="mb-8 flex w-full items-stretch gap-1 overflow-x-hidden">
            { experiences.academic.length > 0 && (
            <TabsTrigger value="academic" className="flex flex-1 items-center justify-center gap-0 px-2 sm:gap-2">
              <GraduationCap size={16} />
              <span className="hidden sm:inline">Academic</span>
            </TabsTrigger>
            )}
            { experiences.teaching.length > 0 && (
            <TabsTrigger value="teaching" className="flex flex-1 items-center justify-center gap-0 px-2 sm:gap-2">
              <Users size={16} />
              <span className="hidden sm:inline">Teaching</span>
            </TabsTrigger>
            )}
            { experiences.industry.length > 0 && (

            <TabsTrigger value="industry" className="flex flex-1 items-center justify-center gap-0 px-2 sm:gap-2">
              <Building size={16} />
              <span className="hidden sm:inline">Industry</span>
            </TabsTrigger>
            )}
            { experiences.service.length > 0 && (
            <TabsTrigger value="service" className="flex flex-1 items-center justify-center gap-0 px-2 sm:gap-2">
              <Award size={16} />
              <span className="hidden sm:inline">Service</span>
            </TabsTrigger>
            )}
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
            {experienceSummary.map((stat, index) => (
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