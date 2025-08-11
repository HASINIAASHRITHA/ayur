import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirestore } from '@/hooks/useFirestore';
import { useToast } from '@/hooks/use-toast';
import { sendWhatsAppNotification } from '@/lib/whatsapp';
import SuccessToast from '@/components/ui/success-toast';
import { MapPin, Phone, Mail, Clock, Calendar, Loader2 } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const { submitContactMessage } = useFirestore();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      await submitContactMessage(contactData);

      // Send WhatsApp notification
      try {
        await sendWhatsAppNotification('contact', contactData);
      } catch (whatsappError) {
        console.error('WhatsApp notification failed:', whatsappError);
      }

      setShowSuccessToast(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        "Dr. Basavaiah Ayurveda Hospital",
        "Venkataraju Nagar",
        "Visakhapatnam, Andhra Pradesh",
        "PIN: 530018"
      ]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "Main: +91-891-123-4567",
        "Emergency: +91-891-987-6543",
        "WhatsApp: +91-9876543210"
      ]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@basavaiahayurveda.com",
        "appointments@basavaiahayurveda.com",
        "emergency@basavaiahayurveda.com"
      ]
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Monday - Saturday: 8:00 AM - 8:00 PM",
        "Sunday: 9:00 AM - 6:00 PM",
        "Emergency: 24/7"
      ]
    }
  ];

  return (
    <>
      <SuccessToast
        visible={showSuccessToast}
        title="Message Sent Successfully! 📧"
        description="Thank you for contacting us! We'll respond within 24 hours to schedule your appointment."
        onClose={() => setShowSuccessToast(false)}
      />
      
      <section id="contact" className="py-20 bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-deep-brown mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-deep-brown/80 max-w-3xl mx-auto leading-relaxed">
            Ready to start your healing journey? Contact us today to schedule your consultation 
            or learn more about our Ayurvedic treatments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <Card className="shadow-premium bg-pure-white">
            <CardHeader>
              <CardTitle className="font-heading text-2xl font-bold text-deep-brown flex items-center gap-3">
                <Calendar className="w-6 h-6 text-herbal-primary" />
                Book Your Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-deep-brown mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-herbal-primary/30 focus:border-herbal-primary focus:ring-herbal-primary"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-deep-brown mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-herbal-primary/30 focus:border-herbal-primary focus:ring-herbal-primary"
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-deep-brown mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-herbal-primary/30 focus:border-herbal-primary focus:ring-herbal-primary"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-deep-brown mb-2">
                    Message / Health Concerns
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-herbal-primary/30 focus:border-herbal-primary focus:ring-herbal-primary"
                    placeholder="Please describe your health concerns or questions..."
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    'Send Message & Book Consultation'
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We'll respond within 24 hours to schedule your appointment.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <Card 
                key={info.title}
                className="bg-pure-white shadow-soft hover:shadow-gold transition-all duration-300 hover-lift animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-deep-brown" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-deep-brown mb-3">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Google Maps Placeholder */}
            <Card className="bg-pure-white shadow-premium">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-gold rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-deep-brown mx-auto mb-4" />
                    <p className="text-deep-brown font-medium">
                      Google Maps Integration
                    </p>
                    <p className="text-sm text-deep-brown/70">
                      Interactive map will be embedded here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200 shadow-soft">
              <CardContent className="p-6 text-center">
                <h3 className="font-heading text-lg font-bold text-red-800 mb-2">
                  Medical Emergency?
                </h3>
                <p className="text-red-700 mb-4">
                  For urgent medical assistance, call our emergency line immediately.
                </p>
                <Button variant="emergency" size="lg" className="w-full">
                  Emergency: +91-891-987-6543
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default ContactSection;