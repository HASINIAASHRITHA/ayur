import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/hooks/useFirestore';
import { Stethoscope, Brain, Heart, Bone, Baby, Flower } from 'lucide-react';
import { Link } from 'react-router-dom';
import ayurvedicHerbs from '@/assets/ayurvedic-herbs.jpg';
import AppointmentBookingModal from '@/components/AppointmentBookingModal';

const ServicesSection = () => {
  const { services: firestoreServices, fetchServices, loading } = useFirestore();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  // Icon mapping for Firestore services
  const iconMap: { [key: string]: any } = {
    'Stethoscope': Stethoscope,
    'Brain': Brain,
    'Heart': Heart,
    'Bone': Bone,
    'Baby': Baby,
    'Flower': Flower
  };

  // Only show admin-added services
  const servicesToDisplay = firestoreServices.map(service => ({
    ...service,
    icon: iconMap[service.icon] || Stethoscope
  }));

  return (
    <section id="services" className="py-20 bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-deep-brown mb-6">
            Our Ayurvedic Services
          </h2>
          <p className="text-xl text-deep-brown/80 max-w-3xl mx-auto leading-relaxed">
            Comprehensive healthcare solutions rooted in ancient Ayurvedic wisdom, 
            tailored to address your unique health needs and constitution.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-deep-brown/60">Loading services...</p>
          </div>
        ) : servicesToDisplay.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-deep-brown/60">No services available. Please check back later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesToDisplay.map((service, index) => (
            <Card 
              key={service.title}
              className="group hover-lift animate-fade-up bg-pure-white border-gold-soft/20 shadow-soft hover:shadow-gold transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gold rounded-full mb-4 mx-auto group-hover:shadow-premium transition-all duration-300">
                  <service.icon className="w-8 h-8 text-deep-brown" />
                </div>
                <CardTitle className="font-heading text-xl font-bold text-deep-brown">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={service.imageUrl || ayurvedicHerbs}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>

                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-herbal-primary">
                      <div className="w-2 h-2 bg-gold-soft rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Link to={`/service/${service.id}`}>
                  <Button 
                    variant="outline" 
                    className="w-full mt-6 group-hover:bg-herbal-primary group-hover:text-pure-white transition-all duration-300"
                  >
                    Learn More & Book
                  </Button>
                </Link>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16 bg-pure-white rounded-2xl p-8 shadow-premium">
          <h3 className="font-heading text-2xl font-bold text-deep-brown mb-4">
            Ready to Begin Your Healing Journey?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Schedule a consultation with our experienced Ayurvedic practitioners and 
            discover personalized treatment options for your health concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={() => setBookingModalOpen(true)}>
              Book Consultation
            </Button>
            <Button variant="outline" size="lg">
              Call Now: +91-98481 62013
            </Button>
          </div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      <AppointmentBookingModal 
        open={bookingModalOpen} 
        onClose={() => setBookingModalOpen(false)}
        services={firestoreServices}
      />
    </section>
  );
};

export default ServicesSection;