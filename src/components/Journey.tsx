import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle, Clock, Target, BookOpen, Users, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { milestones, currentResearch, achievements, researchEnvironment } from '../data/journey_data';

export function Journey() {
  const [progressValue, setProgressValue] = useState(0);


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-600" size={20} />;
      case 'in-progress': return <Clock className="text-emerald-600" size={20} />;
      case 'upcoming': return <Target className="text-gray-400" size={20} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-emerald-100 text-emerald-800';
      case 'upcoming': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <section id="phd-journey" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold text-primary">Academic Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Documenting my doctoral research journey, from admission through anticipated completion, 
            highlighting key milestones, research progress, and academic achievements.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Timeline */}
          <div>
            <h3 className="mb-6">Academic Milestones</h3>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div 
                    className="flex-shrink-0 mt-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  >
                    {getStatusIcon(milestone.status)}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h4>{milestone.title}</h4>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                      >
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.date}
                        </Badge>
                      </motion.div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Research Overview */}
          <div>
            <h3 className="mb-6">Current Research</h3>
            <Card>
              <CardHeader>
                <CardTitle className="leading-tight">{currentResearch.title}</CardTitle>
                <div className="text-gray-600">
                  <p><strong>Advisor:</strong> {currentResearch.advisor}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h4 className="mb-3">Research Progress</h4>
                  <div className="mb-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      onViewportEnter={() => {
                        setTimeout(() => setProgressValue(currentResearch.progress), 500);
                      }}
                    >
                      <Progress value={progressValue} className="h-2" />
                    </motion.div>
                  </div>
                  <motion.p 
                    className="text-sm text-gray-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 }}
                  >
                    {currentResearch.progress}% Complete
                  </motion.p>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3">Abstract</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {currentResearch.abstract}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3">Research Objectives</h4>
                  <ul className="space-y-2">
                    {currentResearch.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3">Dissertation Committee</h4>
                  <ul className="space-y-1">
                    {currentResearch.committee.map((member, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Research Environment */}
        {researchEnvironment && (
          <div className="mb-12">
            <h3 className="mb-6 text-center text-lg font-semibold text-green-600">Research Environment</h3>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={researchEnvironment.photo}
                alt="Research laboratory environment"
                className="w-full h-full object-cover"
                />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="mb-2">{researchEnvironment.centerName}</h3>
                  <p className="text-lg opacity-90">{researchEnvironment.university} • {researchEnvironment.department}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Grid */}
        <div>
          <h3 className="mb-6 text-center text-lg font-semibold text-green-600">Academic Achievements</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <motion.div 
                        className="p-3 bg-green-50 rounded-full"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        whileHover={{ rotate: 360 }}
                      >
                        <achievement.icon className="text-green-600" size={24} />
                      </motion.div>
                    </div>
                    <h4 className="mb-2">{achievement.title}</h4>
                    <p className="text-gray-600 text-sm">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}