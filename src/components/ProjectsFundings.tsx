import React from 'react';
import { motion } from 'motion/react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Calendar, User, Landmark } from 'lucide-react';
import * as Icons from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export function ProjectsFundings() {
  const { data: { projects } } = usePortfolio();
  const projectsAndFundings = projects.projectsAndFundings || projects;
  return (
    <section id="projects-fundings" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-6 tracking-tight">Projects & Fundings</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            A comprehensive overview of my academic projects and competitively awarded research grants.
          </p>
          <div className="w-24 h-1 bg-primary/80 mx-auto rounded-full" />
        </motion.div>

        <Tabs defaultValue="course-projects" className="w-full">
          <TabsList className="flex justify-center w-full mb-12 max-w-md mx-auto">
            <TabsTrigger value="course-projects" className="w-1/2">
              Course Projects
            </TabsTrigger>
            <TabsTrigger value="research-grants" className="w-1/2">
              Research Grants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="course-projects">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsAndFundings.courseProjects.map((project, index) => {
                const Icon = (Icons as any)[project.icon] || Icons.Circle;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Card className="h-full flex flex-col group border-green-100/80 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="p-3 bg-green-50 w-fit rounded-xl text-primary mb-5 group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                          <Icon size={24} />
                        </div>
                        <CardTitle className="text-lg font-bold leading-tight mb-3">
                          {project.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <Calendar size={16} />
                          <span>{project.year}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-[15px] text-gray-600 leading-relaxed">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="research-grants">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              {projectsAndFundings.researchGrants.map((grant, index) => {
                const Icon = (Icons as any)[grant.icon] || Icons.Circle;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col group border-green-100/80 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <CardHeader className="pb-6">
                        <div className="flex justify-between items-start mb-5">
                          <div className="p-3.5 bg-green-50 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                            <Icon size={26} strokeWidth={1.5} />
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-none font-semibold text-sm px-3 py-1 flex items-center gap-1.5 shadow-none mt-1">
                            <Landmark size={14} />
                            {grant.amount}
                          </Badge>
                        </div>
                        <CardTitle className="text-[18px] font-bold leading-tight mb-5">
                          {grant.title}
                        </CardTitle>

                        <div className="space-y-3 mt-4 border-t pt-5 border-gray-100/80">
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                              <User size={16} className="text-gray-500" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Principal Investigator</span>
                              <span className="font-medium text-gray-900 truncate">{grant.principalInvestigator}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                              <Calendar size={16} className="text-gray-500" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Year Awarded</span>
                              <span className="font-medium text-gray-900">{grant.year}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
