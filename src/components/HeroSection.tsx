import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Users, Clock, Shield } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';
import AppointmentBookingModal from '@/components/AppointmentBookingModal';
import { useFirestore } from '@/hooks/useFirestore';

const HeroSection = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const { services } = useFirestore();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-herbal-primary/80 via-herbal-primary/60 to-gold-soft/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-up">
              <h1 className="font-heading text-5xl lg:text-7xl font-bold text-pure-white leading-tight mb-6">
                Ancient Wisdom,
                <span className="block text-gold-soft">Modern Care</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-pure-white/90 mb-8 leading-relaxed max-w-2xl">
                Experience the power of authentic Ayurvedic healing at Dr. Basavaiah Ayurveda Hospital. 
                Trusted by over 50,000 patients since 1938.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="animate-scale-in"
                  onClick={() => setIsAppointmentModalOpen(true)}
                >
                  Book Your Consultation
                </Button>
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="text-pure-white border-pure-white hover:bg-pure-white hover:text-herbal-primary animate-scale-in"
                  onClick={() => window.open('tel:+91-891-987-6543')}
                >
                  Emergency Care
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-pure-white/10 backdrop-blur-md rounded-xl p-6 text-center hover-lift animate-fade-up">
              <Users className="w-8 h-8 text-gold-soft mx-auto mb-3" />
              <div className="text-3xl font-bold text-pure-white font-heading">50,000+</div>
              <div className="text-pure-white/80 font-medium">Patients Treated</div>
            </div>

            <div className="bg-pure-white/10 backdrop-blur-md rounded-xl p-6 text-center hover-lift animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <Clock className="w-8 h-8 text-gold-soft mx-auto mb-3" />
              <div className="text-3xl font-bold text-pure-white font-heading">85+</div>
              <div className="text-pure-white/80 font-medium">Years Experience</div>
            </div>

            <div className="bg-pure-white/10 backdrop-blur-md rounded-xl p-6 text-center hover-lift animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Star className="w-8 h-8 text-gold-soft mx-auto mb-3" />
              <div className="text-3xl font-bold text-pure-white font-heading">4.9/5</div>
              <div className="text-pure-white/80 font-medium">Patient Rating</div>
            </div>

            <div className="bg-pure-white/10 backdrop-blur-md rounded-xl p-6 text-center hover-lift animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Shield className="w-8 h-8 text-gold-soft mx-auto mb-3" />
              <div className="text-3xl font-bold text-pure-white font-heading">100%</div>
              <div className="text-pure-white/80 font-medium">Natural Treatment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-pure-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-pure-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      <AppointmentBookingModal 
        open={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        services={services}
      />
    </section>
  );
};

export default HeroSection;