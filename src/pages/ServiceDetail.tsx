import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, Users, Star, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppointmentBookingModal from '@/components/AppointmentBookingModal';
import { useFirestore, Service } from '@/hooks/useFirestore';
import ayurvedicHerbs from '@/assets/ayurvedic-herbs.jpg';
import { getServiceImage } from '@/assets/service-images';

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { services, fetchServices } = useFirestore();
  const [service, setService] = useState<Service | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      await fetchServices();
      if (serviceId && services.length > 0) {
        const foundService = services.find(s => s.id === serviceId);
        setService(foundService || null);
      }
      setLoading(false);
    };
    
    loadService();
  }, [serviceId, services.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary">
        <Header />
        <div className="pt-32 flex justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herbal-primary mx-auto mb-4"></div>
            <p className="text-deep-brown/60">Loading service details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-primary">
        <Header />
        <div className="pt-32 text-center">
          <h1 className="font-heading text-2xl font-bold text-deep-brown mb-4">Service Not Found</h1>
          <Link to="/services">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const benefits = [
    "Personalized treatment approach",
    "Natural healing without side effects",
    "Experienced Ayurvedic practitioners",
    "Holistic wellness focus",
    "Follow-up care included",
    "Lifestyle guidance provided"
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link to="/services">
              <Button 
                variant="outline" 
                className="mb-4 text-deep-brown border-deep-brown hover:bg-herbal-primary hover:text-pure-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </Link>
          </div>

          {/* Service Header */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-deep-brown mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-deep-brown/80 mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-4 mb-8">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-herbal-primary" />
                    <span className="text-deep-brown">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={() => setBookingModalOpen(true)}
                  className="flex-1 sm:flex-none"
                >
                  Book Consultation
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('tel:+919848162013')}
                  className="flex-1 sm:flex-none text-deep-brown border-deep-brown hover:bg-herbal-primary hover:text-pure-white"
                >
                  Call for Info
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-video rounded-xl overflow-hidden shadow-premium">
                <img
                  src={service.imageUrl || getServiceImage(service.title) || ayurvedicHerbs}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Service Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="text-center">
                  <CardContent className="pt-4">
                    <Clock className="w-6 h-6 text-herbal-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">45-60 mins</p>
                    <p className="text-xs text-muted-foreground">Session Duration</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4">
                    <Users className="w-6 h-6 text-herbal-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">500+</p>
                    <p className="text-xs text-muted-foreground">Patients Treated</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4">
                    <Star className="w-6 h-6 text-herbal-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">4.9/5</p>
                    <p className="text-xs text-muted-foreground">Patient Rating</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="font-heading text-2xl font-bold text-deep-brown">
                What to Expect During Your Consultation
              </CardTitle>
              <CardDescription>
                Our comprehensive approach ensures you receive personalized care
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-herbal-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-herbal-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Initial Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed consultation to understand your health history and current concerns
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-herbal-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-herbal-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Personalized Treatment</h3>
                  <p className="text-sm text-muted-foreground">
                    Customized treatment plan based on your constitution and health needs
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-herbal-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-herbal-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Follow-up Care</h3>
                  <p className="text-sm text-muted-foreground">
                    Ongoing support and monitoring to ensure optimal healing progress
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="font-heading text-2xl font-bold text-deep-brown">
                Benefits of This Treatment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-herbal-primary" />
                    <span className="text-deep-brown">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-herbal-primary text-pure-white">
            <CardContent className="text-center py-12">
              <h2 className="font-heading text-3xl font-bold mb-4">
                Ready to Start Your Healing Journey?
              </h2>
              <p className="text-pure-white/90 mb-8 max-w-2xl mx-auto">
                Take the first step towards natural healing and wellness. Our experienced practitioners are here to guide you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={() => setBookingModalOpen(true)}
                  className="text-deep-brown bg-gold-soft hover:bg-gold-soft/90"
                >
                  Book Your Consultation
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-pure-white text-pure-white hover:bg-pure-white hover:text-herbal-primary"
                  onClick={() => window.open('tel:+919848162013')}
                >
                  Call Now: +91 98481 62013
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {/* Appointment Booking Modal */}
      <AppointmentBookingModal 
        open={bookingModalOpen} 
        onClose={() => setBookingModalOpen(false)}
        services={services}
      />
    </div>
  );
};

export default ServiceDetail;