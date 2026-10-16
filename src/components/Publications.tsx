import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ExternalLink, Download, Calendar, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../contexts/PortfolioContext';

export function Publications() {
  const { data: { publications, personalInfo } } = usePortfolio();
  const pubsList = publications.publications || publications;

  const [selectedPublication, setSelectedPublication] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatUrl = (url?: string) => {
    if (!url) return '';
    const trimmed = url.trim();
    return trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`;
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
        <CardTitle className="leading-tight text-lg text-primary font-medium mb-2">
          {pub.link && pub.link.trim() ? (
            <a
              href={formatUrl(pub.link)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:underline hover:text-primary/80 inline-flex items-center gap-1.5 transition-colors group/title"
              title="Open publication link"
            >
              <span>{pub.title}</span>
              <ExternalLink size={16} className="inline-block flex-shrink-0 opacity-70 group-hover/title:opacity-100 transition-opacity" />
            </a>
          ) : (
            <span>{pub.title}</span>
          )}
        </CardTitle>
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
            {type === 'journal' ? `${pub.journal}, ${pub.year}` : 
             type === 'conference' ? `${pub.conference}, ${pub.year}` :
             type === 'thesis' ? `${pub.year} - ${pub.journal || 'Thesis'}` :
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

        <Tabs defaultValue={pubsList["conference"].length > 0 ? "conference" : "journal" } className="w-full">
          <TabsList className="flex justify-between w-full mb-8">
            {pubsList['conference'].length > 0 && (
              <TabsTrigger value="conference">
                Conference Papers ({pubsList['conference'].length})
              </TabsTrigger>
            )}
            {pubsList['journal'].length > 0 && (
              <TabsTrigger value="journal">
                Journal ({pubsList['journal'].length})
              </TabsTrigger>
            )}
            {pubsList['thesis'].length > 0 && (
              <TabsTrigger value="thesis">
                Thesis ({pubsList['thesis'].length})
              </TabsTrigger>
            )}
            {pubsList['working-papers'].length > 0 && (
              <TabsTrigger value="working-papers">
                Working Papers ({pubsList['working-papers'].length})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="conference">
            <div className="grid md:grid-cols-2 gap-6">
              {pubsList['conference'].map((pub, index) => (
                <PublicationCard key={index} pub={pub} type="conference" index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="journal">
            <div className="grid md:grid-cols-2 gap-6">
              {pubsList['journal'].map((pub, index) => (
                <PublicationCard key={index} pub={pub} type="journal" index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="thesis">
            <div className="grid md:grid-cols-2 gap-6">
              {pubsList['thesis'].map((pub, index) => (
                <PublicationCard key={index} pub={pub} type="thesis" index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="working-papers">
            <div className="grid md:grid-cols-2 gap-6">
              {pubsList['working-papers'].map((pub, index) => (
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