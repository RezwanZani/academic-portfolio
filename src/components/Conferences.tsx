import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Presentation, Users, Award } from 'lucide-react';
import { conferences, conferenceSummary } from '../data/conferences_data';

export function Conferences() {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'International': return 'bg-emerald-100 text-emerald-800';
      case 'National': return 'bg-green-100 text-green-800';
      case 'Regional': return 'bg-lime-100 text-lime-800';
      case 'Institutional': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="conferences" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold text-primary">Conference Presentations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Active participation in academic conferences, workshops, and symposiums, 
            sharing research findings and building professional networks in the academic community.
          </p>
        </div>

        <div className="space-y-6">
          {conferences.map((conference, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="mb-3 text-lg font-semibold text-primary">{conference.name}</CardTitle>
                    <div className="grid sm:grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} />
                        <span>{conference.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} />
                        <span>{conference.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getStatusColor(conference.status)}>
                        {conference.status}
                      </Badge>
                      <Badge className={getTypeColor(conference.type)}>
                        {conference.type}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Presentation size={12} />
                        {conference.role}
                      </Badge>
                    </div>
                  </div>
                  
                  {conference.recognition && (
                    <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-md">
                      <Award size={16} />
                      <span className="text-sm">{conference.recognition}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <h4 className="mb-2 font-normal">Presentation Title</h4>
                  <p className="text-primary font-semibold italic">{conference.presentation}</p>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {conference.description}
                </p>
                
                <div>
                  <h4 className="mb-3 flex items-center gap-2">
                    <Users size={16} />
                    Conference Activities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {conference.activities.map((activity, actIndex) => (
                      <Badge key={actIndex} variant="secondary" className="text-sm">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {conferenceSummary.length > 0 && (
        <div className="text-center mt-12">
          <div className="flex justify-between max-w-5xl mx-auto">
            {conferenceSummary.map((item, index) => (
              <div className="text-center" key={index}>
                <div className="text-3xl font-semibold mb-2">{item.value}+</div>
                <div className="text-gray-600">{item.title}</div>
              </div>
            ))}
             
          </div>
        </div>
        )} 
      </div>
    </section>
  );
}