import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, User, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/hooks/useFirestore';
import { sendWhatsAppNotification } from '@/lib/whatsapp';
import SuccessToast from '@/components/ui/success-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const { toast } = useToast();
  const { submitContactMessage } = useFirestore();

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

      // Send WhatsApp notification to both admin and user
      try {
        await sendWhatsAppNotification('contact', contactData, true);
      } catch (whatsappError) {
        console.error('WhatsApp notification failed:', whatsappError);
      }

      setShowSuccessToast(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SuccessToast
        visible={showSuccessToast}
        title="Message Sent Successfully! 📧"
        description="Thank you for contacting us! We'll get back to you within 24 hours with appointment details."
        onClose={() => setShowSuccessToast(false)}
      />
      
      <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-16 bg-pure-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-deep-brown mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get in touch with our team for consultations, appointments, or any questions about our services
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="shadow-premium text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Phone className="w-8 h-8 text-deep-brown" />
                  </div>
                  <h3 className="font-semibold text-deep-brown mb-2">Phone</h3>
                  <p className="text-muted-foreground">+91 98481 62013</p>
                </CardContent>
              </Card>

              <Card className="shadow-premium text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-deep-brown" />
                  </div>
                  <h3 className="font-semibold text-deep-brown mb-2">Email</h3>
                  <p className="text-muted-foreground">info@basavaiahayurveda.com</p>
                  <p className="text-muted-foreground">appointments@basavaiahayurveda.com</p>
                </CardContent>
              </Card>

              <Card className="shadow-premium text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-deep-brown" />
                  </div>
                  <h3 className="font-semibold text-deep-brown mb-2">Address</h3>
                  <p className="text-muted-foreground text-sm">
                    54- 5 - 6, Sivalayam Edhuruga,<br />
                    Lankada vari peta, Jagannaickpur,<br />
                    Kakinada, Andhra Pradesh 533002
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-premium text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-deep-brown" />
                  </div>
                  <h3 className="font-semibold text-deep-brown mb-2">Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Mon - Sat: 9:00 AM - 6:00 PM<br />
                    Sunday: 10:00 AM - 4:00 PM
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form and Map */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-premium">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading font-bold text-deep-brown">
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-herbal-primary" />
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            required
                            disabled={loading}
                            className="pl-10 border-2 border-herbal-primary/20 focus:border-herbal-primary transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-herbal-primary" />
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            required
                            disabled={loading}
                            className="pl-10 border-2 border-herbal-primary/20 focus:border-herbal-primary transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-herbal-primary" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                          disabled={loading}
                          className="pl-10 border-2 border-herbal-primary/20 focus:border-herbal-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-herbal-primary" />
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please describe your health concerns or questions..."
                          rows={5}
                          required
                          disabled={loading}
                          className="pl-10 pt-10 border-2 border-herbal-primary/20 focus:border-herbal-primary transition-colors resize-none"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="shadow-premium">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading font-bold text-deep-brown">
                    Visit Our Location
                  </CardTitle>
                  <CardDescription>
                    Find us easily with our convenient location in the heart of the city
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-herbal-primary/10 to-gold-soft/10 rounded-xl shadow-soft border-2 border-herbal-primary/20 flex items-center justify-center overflow-hidden">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-gradient-gold rounded-full mx-auto mb-4 flex items-center justify-center shadow-soft">
                        <MapPin className="w-8 h-8 text-deep-brown" />
                      </div>
                      <p className="text-herbal-primary font-semibold mb-2">Interactive Map Coming Soon</p>
                      <p className="text-sm text-muted-foreground max-w-xs">
                        123 Ayurveda Street, Wellness District, Bangalore - 560001
                      </p>
                      <div className="mt-4 flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-herbal-primary rounded-full"></div>
                        <div className="w-2 h-2 bg-gold-soft rounded-full"></div>
                        <div className="w-2 h-2 bg-herbal-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <Button variant="outline" className="w-full">
                      Get Directions
                    </Button>
                    
                    <div className="text-sm text-muted-foreground">
                      <h4 className="font-semibold text-deep-brown mb-2">Nearby Landmarks:</h4>
                      <ul className="space-y-1">
                        <li>• Near Metro Station (500m)</li>
                        <li>• Opposite City Hospital</li>
                        <li>• Next to Central Park</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-pure-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-heading font-bold text-deep-brown mb-6">
              Emergency & Urgent Care
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              For urgent health concerns or emergencies, please contact us immediately
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Call Emergency: +91 98481 62013
              </Button>
              <Button variant="outline" size="lg">
                Book Immediate Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      </div>
    </>
  );
};

export default Contact;