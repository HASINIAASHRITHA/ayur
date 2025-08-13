import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import hospitalLogo from '@/assets/hospital-logo.jpg';
import AppointmentBookingModal from '@/components/AppointmentBookingModal';
import { useFirestore } from '@/hooks/useFirestore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const { services } = useFirestore();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pure-white/90 backdrop-blur-lg shadow-soft transition-all duration-300">
      {/* Top bar */}
      <div className="bg-herbal-primary text-pure-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Emergency: +91-9848162013</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm truncate">Jagannaickpur,Kakinada</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <span className="text-xs">Serving the community since 1938</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={hospitalLogo}
              alt="Dr. Basavaiah Ayurveda Hospital"
              className="h-12 w-12 rounded-full object-cover shadow-soft"
            />
            <div>
              <h1 className="font-heading text-xl font-bold text-deep-brown">
                Dr. Basavaiah Ayurveda Hospital
              </h1>
              <p className="text-sm text-herbal-primary font-medium">
                Natural Healing Since 1938
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-deep-brown hover:text-herbal-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              Book Appointment
            </Button>
            <Link to="/emergency">
              <Button 
                variant="destructive" 
                size="sm"
                className="bg-red-600 hover:bg-red-700"
              >
                  Emergency Care
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-deep-brown hover:text-herbal-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-pure-white border-t border-parchment shadow-soft">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-deep-brown hover:text-herbal-primary transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-parchment">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setIsAppointmentModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Book Appointment
              </Button>
              <Link to="/emergency" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Emergency Care
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Booking Modal */}
      <AppointmentBookingModal 
        open={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        services={services}
      />
    </header>
  );
};

export default Header;