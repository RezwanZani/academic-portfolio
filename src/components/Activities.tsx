import React from 'react';
import { motion } from 'motion/react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import * as Icons from 'lucide-react';
import { Award, Calendar, MapPin } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export function Activities() {
  const { data: { conferences } } = usePortfolio();
  const activitiesData = conferences.activitiesData || conferences;

  return (
    <section id="activities" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-6 tracking-tight">Activities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            A track record of my global competition participations and academic conference presentations.
          </p>
          <div className="w-24 h-1 bg-primary/80 mx-auto rounded-full" />
        </motion.div>

        <Tabs defaultValue="competitions" className="w-full">
          <TabsList className="flex justify-center w-full mb-12 max-w-md mx-auto">
            <TabsTrigger value="competitions" className="w-1/2">
              Competitions
            </TabsTrigger>
            <TabsTrigger value="conferences" className="w-1/2">
              Conferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="competitions">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {activitiesData.competitions.map((item, index) => {
                const Icon = (Icons as any)[item.icon] || Icons.Circle;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col group border-green-100/80 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-5">
                          <div className="p-3.5 bg-green-50 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                            <Icon size={26} strokeWidth={1.5} />
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-none font-semibold text-sm px-3 py-1 flex items-center gap-1.5 shadow-none mt-1">
                            <Icons.Award size={14} />
                            {item.role}
                          </Badge>
                        </div>
                        <CardTitle className="text-[18px] font-bold leading-tight mb-3">
                          {item.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <Icons.Calendar size={16} />
                          <span>{item.year}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow pt-2">
                        <p className="text-[15px] text-gray-600 leading-relaxed border-t border-gray-100/80 pt-4">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="conferences">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {activitiesData.conferences.map((item, index) => {
                const Icon = (Icons as any)[item.icon] || Icons.Circle;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col group border-green-100/80 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-5">
                          <div className="p-3.5 bg-green-50 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                            <Icon size={26} strokeWidth={1.5} />
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-none font-semibold text-sm px-3 py-1 flex items-center gap-1.5 shadow-none mt-1">
                            <Award size={14} />
                            {item.role}
                          </Badge>
                        </div>
                        <CardTitle className="text-[18px] font-bold leading-tight mb-3">
                          {item.title}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{item.year}</span>
                          </div>
                          {item.location && (
                            <div className="flex items-center gap-2">
                              <Icons.MapPin size={16} />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow pt-2">
                        <p className="text-[15px] text-gray-600 leading-relaxed border-t border-gray-100/80 pt-4">
                          {item.description}
                        </p>
                      </CardContent>
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