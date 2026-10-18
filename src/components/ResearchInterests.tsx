import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { DynamicIcon } from './ui/DynamicIcon';
import { usePortfolio } from '../contexts/PortfolioContext';

export function ResearchInterests() {
  const { data: { researchInterests } } = usePortfolio();
  const interestsList = researchInterests?.researchInterests || researchInterests || [];
  return (
    <section id="research-interests" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-primary mb-4 tracking-tight">Research Interests</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Exploring innovative solutions across wireless networks, autonomous systems, and advanced machine learning models.
          </p>
          <div className="w-20 h-1 bg-primary/80 mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Array.isArray(interestsList) ? interestsList : []).map((interest: any, index: number) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="text-center h-full border-green-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-8 pb-8 px-6 flex flex-col items-center h-full">
                    <div className="flex justify-center mb-5">
                      <motion.div 
                        className="p-4 bg-green-50 rounded-full"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        whileHover={{ rotate: 360 }}
                      >
                        <DynamicIcon name={interest.icon} className="text-green-600" size={28} />
                      </motion.div>
                    </div>
                    <h3 className="text-[17px] font-bold text-gray-900 mb-3">{interest.title}</h3>
                    <p className="text-gray-600 text-[14px] leading-relaxed flex-grow">
                      {interest.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
