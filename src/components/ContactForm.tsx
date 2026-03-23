import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'sonner';
import { Send } from 'lucide-react';
import { CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export const ContactForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get credentials from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!formRef.current) {
      toast.error('Failed to send message. Please refresh and try again.');
      setIsSubmitting(false);
      return;
    }

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
          toast.success('Message sent successfully! I will get back to you soon.');
          // Clear the form
          setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
          console.error(error.text);
          toast.error('Failed to send message. Please try again later.');
      })
      .finally(() => {
          setIsSubmitting(false);
      });
  };

  return (
    <>
      {/* Add the Toaster component somewhere near the top of your app or this section */}
      <Toaster position="bottom-right" richColors />

      
        {/* We add the ref={formRef} here so EmailJS can read the inputs */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm mb-2">Name *</label>
              <Input
                id="name"
                name="name" // Matches {{name}} in EmailJS template
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-2">Email *</label>
              <Input
                id="email"
                name="email" // Matches {{email}} in EmailJS template
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@domain.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm mb-2">Subject *</label>
            <Input
              id="subject"
              name="subject" // Matches {{subject}} in EmailJS template
              value={formData.subject}
              onChange={handleInputChange}
              required
              placeholder="Brief description of your inquiry"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm mb-2">Message *</label>
            <Textarea
              id="message"
              name="message" // Matches {{message}} in EmailJS template
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
    </>
  );
};