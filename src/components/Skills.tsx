import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { Code2, Monitor, Cpu, Wrench, Microscope, Users, BookOpen, CheckCircle2 } from 'lucide-react';

const categoryConfig = {
  researchAndDomainKnowledge: {
    title: "Research & Domain Knowledge",
    icon: BookOpen,
    description: "Specialized theoretical foundations and core areas of ongoing research focus."
  },
  technicalExpertise: {
    title: "Technical Expertise",
    icon: Microscope,
    description: "Core engineering capabilities, methodologies, and analytical approaches."
  },
  software: {
    title: "Software",
    icon: Cpu,
    description: "Industry-standard engineering, design, and simulation environments."
  },
  languages: {
    title: "Programming",
    icon: Code2,
    description: "Languages utilized for scripting, development, and algorithm design."
  },
  platforms: {
    title: "Platforms & Env.",
    icon: Monitor,
    description: "Primary hardware platforms and development environments."
  },
  tools: {
    title: "Tools Hub",
    icon: Wrench,
    description: "Applications for documentation, project management, and productivity."
  },
  softSkills: {
    title: "Professional Skills",
    icon: Users,
    description: "Interpersonal strengths and leadership abilities for effective collaboration."
  }
};

export function Skills() {
  const { data: { skills } } = usePortfolio();
  const orderedKeys: (keyof typeof categoryConfig)[] = [
    'researchAndDomainKnowledge',
    'technicalExpertise',
    'software',
    'languages',
    'platforms',
    'tools',
    'softSkills'
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-primary mb-6 tracking-tight">Technical & Professional Profile</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            A comprehensive overview of my technical capabilities, research interests, and the tools I utilize to bridge the gap between theoretical concepts and practical applications.
          </p>
          <div className="w-24 h-1 bg-primary/80 mx-auto rounded-full" />
        </motion.div>

        {/* Changed to 2 columns and removed items-start so cards stretch to equal height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {orderedKeys.map((key, index) => {
            const items = skills[key];
            const config = categoryConfig[key];
            if (!items || !config) return null;
            const Icon = config.icon;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white p-8 rounded-3xl shadow-sm border border-green-100 hover:shadow-xl hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex flex-col items-start mb-6">
                  <div className="p-3 bg-green-50 group-hover:bg-primary text-primary group-hover:text-black rounded-2xl transition-colors duration-300 mb-4">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">{config.title}</h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed">
                    {config.description}
                  </p>
                </div>

                {/* Changed exactly to use two columns for the lists inside every section map */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-auto pt-4 border-t border-gray-50">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-3 group/item">
                      <CheckCircle2 size={18} className="text-primary/70 mt-0.5 group-hover/item:text-primary transition-colors flex-shrink-0" />
                      <span className="text-gray-700 font-medium text-[15px] group-hover/item:text-gray-950 transition-colors leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
