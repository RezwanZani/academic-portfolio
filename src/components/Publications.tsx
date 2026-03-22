import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ExternalLink, Download, Calendar, Users } from 'lucide-react';
import { motion } from 'motion/react';

export function Publications() {
  const publications = {
    'peer-reviewed': [
      {
        title: "Advanced Methodologies in [Your Research Area]: A Comprehensive Analysis",
        authors: ["Your Name", "Co-Author 1", "Co-Author 2"],
        journal: "Journal of [Field Name]",
        year: 2024,
        volume: "15",
        issue: "3",
        pages: "123-145",
        doi: "10.1000/journal.2024.001",
        status: "Published",
        abstract: "This paper presents novel methodologies for [research area], demonstrating significant improvements in [specific metric]. Our findings contribute to the understanding of [research topic] and provide practical applications for [field application].",
        keywords: ["Keyword 1", "Keyword 2", "Keyword 3", "Keyword 4"],
        impact: "Cited 12 times"
      },
      {
        title: "Innovative Approaches to [Specific Topic]: Implications for Future Research",
        authors: ["Co-Author 1", "Your Name", "Co-Author 3"],
        journal: "International Review of [Field]",
        year: 2023,
        volume: "28",
        issue: "2",
        pages: "67-89",
        doi: "10.1000/intlreview.2023.002",
        status: "Published",
        abstract: "This study explores innovative approaches to [specific topic], revealing new insights into [research area]. The research methodology employed provides a framework for future investigations in this domain.",
        keywords: ["Innovation", "Research Methods", "Analysis", "Framework"],
        impact: "Cited 8 times"
      }
    ],
    'conference': [
      {
        title: "Emerging Trends in [Your Field]: A Data-Driven Analysis",
        authors: ["Your Name", "Advisor Name"],
        conference: "International Conference on [Field Name]",
        year: 2024,
        location: "City, Country",
        status: "Accepted",
        type: "Oral Presentation",
        abstract: "This presentation discusses emerging trends identified through comprehensive data analysis, providing insights for future research directions and practical applications.",
        keywords: ["Trends", "Data Analysis", "Emerging Technologies"]
      },
      {
        title: "Methodological Innovations in [Research Area]: A Case Study Approach",
        authors: ["Your Name", "Co-Researcher"],
        conference: "Annual Symposium on [Field]",
        year: 2023,
        location: "City, Country",
        status: "Published",
        type: "Poster Presentation",
        abstract: "A case study demonstrating the effectiveness of new methodological approaches in [research area], with implications for broader application in the field.",
        keywords: ["Methodology", "Case Study", "Innovation"]
      }
    ],
    'working-papers': [
      {
        title: "Future Directions in [Research Area]: A Systematic Review",
        authors: ["Your Name", "Co-Author"],
        year: 2024,
        status: "Under Review",
        journal: "Target Journal Name",
        abstract: "A comprehensive systematic review examining future directions in [research area], identifying gaps in current knowledge and proposing research agendas for the next decade.",
        keywords: ["Systematic Review", "Future Research", "Knowledge Gaps"]
      }
    ]
  };

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
        <CardTitle className="leading-tight mb-2">{pub.title}</CardTitle>
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
          <h2 className="mb-4">Publications & Research</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A collection of my academic contributions, including peer-reviewed articles, 
            conference presentations, and ongoing research projects.
          </p>
        </div>

        <Tabs defaultValue="peer-reviewed" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="peer-reviewed">
              Peer-Reviewed ({publications['peer-reviewed'].length})
            </TabsTrigger>
            <TabsTrigger value="conference">
              Conference Papers ({publications.conference.length})
            </TabsTrigger>
            <TabsTrigger value="working-papers">
              Working Papers ({publications['working-papers'].length})
            </TabsTrigger>
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
              {publications.conference.map((pub, index) => (
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
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink size={16} />
              View on Google Scholar
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink size={16} />
              View on ResearchGate
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Download Publication List
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}