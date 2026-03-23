import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Award } from 'lucide-react';
import { motion } from 'motion/react';
import {educationData, educationSummary} from '../data/education_data';

export function Education() {

  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">Education</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {educationSummary.description}
          </p>
        </motion.div>

        <div className="space-y-8">
          {educationData.map((education, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="relative overflow-hidden">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 w-1 bg-green-600"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                ></motion.div>
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-3 mb-2">
                      <span className='text-lg font-semibold text-primary'>{education.degree}</span>
                      <Badge 
                        variant={education.status === 'In Progress' ? 'default' : 'secondary'}
                        className={education.status === 'In Progress' ? 'bg-green-600' : ''}
                      >
                        {education.status}
                      </Badge>
                    </CardTitle>
                    <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span><span className="font-semibold">{education.institution}</span>, {education.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{education.period}</span>
                      </div>
                      {education.gpa || education.cgpa ? (
                        <div className="flex items-center gap-2">
                          <Award size={16} />
                          <span>{education.cgpa ? `CGPA: ${education.cgpa}` : `GPA: ${education.gpa}`}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {education.description}
                </p>
                
                <div>
                  <h4 className="mb-3 text-primary">Key Achievements</h4>
                  <div className="flex flex-wrap gap-2">
                    {education.achievements.map((achievement, achIndex) => (
                      <motion.div
                        key={achIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.2 + achIndex * 0.1 + 0.5 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge variant="outline" className="text-sm">
                          {achievement}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}