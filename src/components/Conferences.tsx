import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Presentation, Users, Award } from 'lucide-react';

export function Conferences() {
  const conferences = [
    {
      name: "International Conference on [Your Field] 2024",
      location: "San Francisco, CA, USA",
      date: "September 15-18, 2024",
      role: "Oral Presenter",
      presentation: "Advanced Methodologies in [Research Area]: Implementation and Results",
      type: "International",
      status: "Upcoming",
      description: "Premier conference bringing together researchers from around the world to discuss cutting-edge developments in [field].",
      activities: [
        "Oral Presentation",
        "Panel Discussion Participant",
        "Networking Session"
      ],
      recognition: "Best Student Presentation Nominee"
    },
    {
      name: "Annual Symposium on [Research Area] 2024",
      location: "Boston, MA, USA",
      date: "June 10-12, 2024",
      role: "Poster Presenter",
      presentation: "Innovative Approaches to [Specific Topic]: A Comprehensive Study",
      type: "National",
      status: "Completed",
      description: "National symposium focused on emerging trends and methodologies in [research area].",
      activities: [
        "Poster Presentation",
        "Workshop Attendance",
        "Early Career Researcher Meetup"
      ],
      recognition: "Outstanding Poster Award"
    },
    {
      name: "Graduate Research Conference 2023",
      location: "Chicago, IL, USA",
      date: "November 8-10, 2023",
      role: "Keynote Attendee",
      presentation: "Preliminary Findings in [Research Topic]",
      type: "Regional",
      status: "Completed",
      description: "Regional conference showcasing graduate student research across multiple disciplines.",
      activities: [
        "Lightning Talk",
        "Research Collaboration Session",
        "Mentor Meetup"
      ],
      recognition: "Best Lightning Talk - 2nd Place"
    },
    {
      name: "International Workshop on [Specialized Topic] 2023",
      location: "London, UK",
      date: "August 20-22, 2023",
      role: "Workshop Participant",
      presentation: "Methodological Innovations in [Area]: A Case Study",
      type: "International",
      status: "Completed",
      description: "Specialized workshop focusing on advanced methodologies and collaborative research opportunities.",
      activities: [
        "Hands-on Workshop",
        "Collaborative Research Planning",
        "International Networking"
      ],
      recognition: "Workshop Excellence Certificate"
    },
    {
      name: "Student Research Symposium 2023",
      location: "[Your University], [City]",
      date: "April 15, 2023",
      role: "Oral Presenter",
      presentation: "Early Stage PhD Research: [Your Topic]",
      type: "Institutional",
      status: "Completed",
      description: "Annual university-wide symposium showcasing student research across all departments.",
      activities: [
        "Oral Presentation",
        "Peer Review Session",
        "Faculty Feedback Session"
      ],
      recognition: "Outstanding Presentation Award"
    }
  ];

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
          <h2 className="mb-4">Conference Presentations</h2>
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
                    <CardTitle className="mb-3">{conference.name}</CardTitle>
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
                  <h4 className="mb-2">Presentation Title</h4>
                  <p className="text-gray-700 italic">{conference.presentation}</p>
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

        <div className="text-center mt-12">
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl mb-2">12+</div>
              <div className="text-gray-600">Conferences Attended</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">8</div>
              <div className="text-gray-600">Presentations Given</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">4</div>
              <div className="text-gray-600">Awards Received</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}