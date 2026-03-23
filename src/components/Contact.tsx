import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, MapPin, Phone, Calendar, ExternalLink, Send } from 'lucide-react';
import personalInfo from '../data/personal_info';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`
    },
    {
      icon: Phone,
      label: "Office Phone",
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`
    },
    {
      icon: MapPin,
      label: "Office Location",
      value:  personalInfo.officeLocation,
      link: null
    },
    {
      icon: Calendar,
      label: "Office Hours",
      value: personalInfo.officeHours,
      link: null
    }
  ];

  const socialLinks = [
    {
      name: "Google Scholar",
      url: personalInfo.googleScholar,
      description: "Academic publications and citations"
    },
    {
      name: "ResearchGate",
      url: personalInfo.researchGate,
      description: "Research profile and collaboration"
    },
    {
      name: "ORCID",
      url: personalInfo.orcid,
      description: "Academic identity and research outputs"
    },
    {
      name: "LinkedIn",
      url: personalInfo.linkedin,
      description: "Professional networking"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    // In a real application, you would send the data to your backend
    alert('Thank you for your message! I will get back to you soon.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I welcome opportunities for collaboration, academic discussions, and professional networking. 
            Feel free to reach out for research inquiries, speaking opportunities, or academic consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="mb-6">Contact Information</h3>
            <div className="space-y-6 mb-8">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-green-50 rounded-lg">
                    <contact.icon className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="mb-1">{contact.label}</h4>
                    {contact.link ? (
                      <a 
                        href={contact.link}
                        className="text-gray-600 hover:text-green-600 transition-colors"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 whitespace-pre-line">{contact.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mb-6">Academic Profiles</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {socialLinks.map((link, index) => (
                link.url && (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4>{link.name}</h4>
                      <ExternalLink size={16} className="text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{link.description}</p>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        Visit Profile
                      </a>
                    </Button>
                  </CardContent>
                </Card>
                )
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@domain.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Brief description of your inquiry"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Please provide details about your inquiry, collaboration proposal, or questions..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="mb-2 text-green-800">Research Collaboration</h4>
              <p className="text-green-700 text-sm">
                I am actively seeking research collaboration opportunities and am open to 
                interdisciplinary projects. Please feel free to reach out if you're interested 
                in collaborating or have funding opportunities for joint research initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}