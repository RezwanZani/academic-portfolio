import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle, Clock, Target, BookOpen, Users, Award } from 'lucide-react';
import { motion } from 'motion/react';

export function PhdJourney() {
  const [progressValue, setProgressValue] = useState(0);
  
  const milestones = [
    {
      title: "PhD Program Admission",
      date: "August 2021",
      status: "completed",
      description: "Admitted to PhD program with graduate research fellowship"
    },
    {
      title: "Coursework Completion",
      date: "May 2023",
      status: "completed",
      description: "Completed all required coursework with GPA 3.95/4.0"
    },
    {
      title: "Comprehensive Exams",
      date: "September 2023",
      status: "completed",
      description: "Successfully passed written and oral comprehensive examinations"
    },
    {
      title: "Dissertation Proposal Defense",
      date: "February 2024",
      status: "completed",
      description: "Successfully defended dissertation proposal with minor revisions"
    },
    {
      title: "Data Collection Phase",
      date: "March 2024 - Present",
      status: "in-progress",
      description: "Currently conducting primary research and data collection"
    },
    {
      title: "Dissertation Writing",
      date: "September 2024 - May 2025",
      status: "upcoming",
      description: "Writing and revising dissertation chapters"
    },
    {
      title: "Dissertation Defense",
      date: "June 2025",
      status: "upcoming",
      description: "Final dissertation defense and degree completion"
    }
  ];

  const currentResearch = {
    title: "Advanced Methodologies in [Your Research Area]: A Comprehensive Investigation",
    advisor: "Dr. [Advisor Name]",
    committee: [
      "Dr. [Committee Member 1] (Chair)",
      "Dr. [Committee Member 2]",
      "Dr. [Committee Member 3]",
      "Dr. [External Member] (External)"
    ],
    abstract: "This dissertation investigates [research topic] through innovative methodological approaches. The research aims to [primary objective] and contributes to the field by [expected contribution]. The study employs [methodology] to examine [research questions] and provide insights for [practical applications].",
    objectives: [
      "Develop novel methodological frameworks for [specific area]",
      "Conduct comprehensive empirical analysis of [research topic]",
      "Evaluate the effectiveness of proposed approaches",
      "Provide practical recommendations for [field application]"
    ],
    progress: 65
  };

  const achievements = [
    {
      icon: Award,
      title: "Graduate Research Fellowship",
      description: "Competitive fellowship covering tuition and stipend for 4 years"
    },
    {
      icon: BookOpen,
      title: "Teaching Excellence Award",
      description: "Recognition for outstanding performance as teaching assistant"
    },
    {
      icon: Users,
      title: "Research Collaboration",
      description: "Collaborative projects with 3 external research institutions"
    },
    {
      icon: Target,
      title: "Conference Presentations",
      description: "8 presentations at national and international conferences"
    }
  ];

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
          <h2 className="mb-4">PhD Journey</h2>
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
        <div className="mb-12">
          <h3 className="mb-6 text-center">Research Environment</h3>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMGxhYm9yYXRvcnklMjBzY2llbmNlfGVufDF8fHx8MTc1NDU1NzcyNnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Research laboratory environment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="mb-2">[Your Laboratory/Research Center]</h3>
                <p className="text-lg opacity-90">[University Name] • [Department]</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div>
          <h3 className="mb-6 text-center">PhD Achievements</h3>
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