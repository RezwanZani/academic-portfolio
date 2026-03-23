import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ExternalLink, Download, Calendar, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { publications } from '../data/publications_data';
import personalInfo from '../data/personal_info';

export function Publications() {

  const [selectedPublication, setSelectedPublication] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const PublicationCard = ({ pub, type, index = 0 }: { pub: any, type: string, index?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" onClick={() => setSelectedPublication(pub)}>
      <CardHeader>
        <CardTitle className="leading-tight text-lg text-primary font-medium mb-2">{pub.title}</CardTitle>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge className={getStatusColor(pub.status)}>
            {pub.status}
          </Badge>
          {pub.type && (
            <Badge variant="outline">{pub.type}</Badge>
          )}
          {pub.impact && (
            <Badge variant="secondary">{pub.impact}</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Users size={16} />
          <span className="text-sm">{pub.authors.join(', ')}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} />
          <span className="text-sm">
            {type === 'peer-reviewed' ? `${pub.journal}, ${pub.year}` : 
             type === 'conference' ? `${pub.conference}, ${pub.year}` :
             `${pub.year} - ${pub.journal || 'Manuscript'}`}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm line-clamp-3">
          {pub.abstract}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {pub.keywords.slice(0, 3).map((keyword: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
          {pub.keywords.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{pub.keywords.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );

  return (
    <section id="publications" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold text-primary">Publications & Research</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A collection of my academic contributions, including peer-reviewed articles, 
            conference presentations, and ongoing research projects.
          </p>
        </div>

        <Tabs defaultValue={publications["peer-reviewed"].length > 0 ? "peer-reviewed" : "conference" } className="w-full">
          <TabsList className="flex justify-between w-full mb-8">
            {publications['peer-reviewed'].length > 0 && (
              <TabsTrigger value="peer-reviewed">
                Peer-Reviewed ({publications['peer-reviewed'].length})
              </TabsTrigger>
            )}
            {publications['conference'].length > 0 && (
              <TabsTrigger value="conference">
                Conference Papers ({publications['conference'].length})
              </TabsTrigger>
            )}
            {publications['working-papers'].length > 0 && (
              <TabsTrigger value="working-papers">
                Working Papers ({publications['working-papers'].length})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="peer-reviewed">
            <div className="grid md:grid-cols-2 gap-6">
              {publications['peer-reviewed'].map((pub, index) => (
                <PublicationCard key={index} pub={pub} type="peer-reviewed" index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="conference">
            <div className="grid md:grid-cols-2 gap-6">
              {publications['conference'].map((pub, index) => (
                <PublicationCard key={index} pub={pub} type="conference" index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="working-papers">
            <div className="grid md:grid-cols-2 gap-6">
              {publications['working-papers'].map((pub, index) => (
                <PublicationCard key={index} pub={pub} type="working-papers" index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {personalInfo.googleScholar && (
              <Button variant="outline" className="flex items-center gap-2 cursor-pointer" onClick={() => window.open(personalInfo.googleScholar, '_blank')}>
                <ExternalLink size={16} />
                View on Google Scholar
              </Button>
            )}
            {personalInfo.researchGate && (
              <Button variant="outline" className="flex items-center gap-2 cursor-pointer" onClick={() => window.open(personalInfo.researchGate, '_blank')}>
                <ExternalLink size={16} />
                View on ResearchGate
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}