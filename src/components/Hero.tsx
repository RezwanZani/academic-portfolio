import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Mail, MapPin, Download } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section id="hero" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Dr. [Your Name]
            </motion.h1>
            <motion.h2 
              className="mb-6 text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              PhD Candidate in [Your Field] | Researcher | Academic
            </motion.h2>
            <motion.p 
              className="mb-8 text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Welcome to my academic portfolio. I am a dedicated researcher pursuing my PhD in [Your Field], 
              with a passion for [Your Research Area]. My work focuses on [Brief Description of Research Focus], 
              and I have presented my findings at international conferences while contributing to peer-reviewed publications.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.div 
                className="flex items-center gap-2 text-gray-600"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin size={16} />
                <span>[Your University/Location]</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 text-gray-600"
                whileHover={{ scale: 1.05 }}
              >
                <Mail size={16} />
                <span>[your.email@university.edu]</span>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="flex items-center gap-2">
                  <Download size={16} />
                  Download CV
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Get in Touch
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              <motion.div 
                className="w-80 h-80 rounded-full overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 p-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1722648346323-f8fffa8e890d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGdyYWR1YXRpb24lMjB1bml2ZXJzaXR5fGVufDF8fHx8MTc1NDU1NzU5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Professional headshot"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-green-600 text-white rounded-full p-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                whileHover={{ rotate: 360 }}
              >
                🎓
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}