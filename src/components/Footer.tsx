import React from 'react';
import { Heart, Phone, Mail, MapPin, Clock } from 'lucide-react';
import hospitalLogo from '@/assets/hospital-logo.jpg';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Patient Stories', href: '#testimonials' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Book Appointment', href: '#contact' },
    { name: 'Emergency Care', href: '#contact' }
  ];

  const services = [
    'General Consultation',
    'Neurological Disorders',
    'Cardiovascular Care',
    'Orthopedic Treatment',
    'Women\'s Health',
    'Wellness Programs'
  ];

  return (
    <footer className="bg-deep-brown text-pure-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hospital Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src={hospitalLogo}
                alt="Dr. Basavaiah Ayurveda Hospital"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-heading text-lg font-bold">
                  Dr. Basavaiah Ayurveda Hospital
                </h3>
                <p className="text-sm text-gold-soft">
                  Natural Healing Since 1938
                </p>
              </div>
            </div>
            <p className="text-pure-white/80 leading-relaxed mb-6">
              Trusted center for authentic Ayurvedic treatment with over 85 years of 
              experience in natural healing and holistic healthcare.
            </p>
            <div className="flex items-center space-x-2 text-gold-soft">
              <Heart className="w-5 h-5" />
              <span className="text-sm">50,000+ patients healed naturally</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-gold-soft">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-pure-white/80 hover:text-gold-soft transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-gold-soft">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-pure-white/80">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-gold-soft">
              Contact Information
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-soft mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-pure-white/80 text-sm">
                    54- 5 - 6, Sivalayam Edhuruga,<br />
                    Lankada vari peta, Jagannaickpur,<br />
                    Kakinada, Andhra Pradesh 533002
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-soft flex-shrink-0" />
                <div>
                  <p className="text-pure-white/80 text-sm">+91 98481 62013</p>
                  <p className="text-red-400 text-sm">Emergency: +91 98481 62013</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-soft flex-shrink-0" />
                <p className="text-pure-white/80 text-sm">
                  info@basavaiahayurveda.com
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gold-soft mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-pure-white/80 text-sm">
                    Mon-Sat: 8:00 AM - 8:00 PM<br />
                    Sunday: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pure-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-pure-white/60 text-sm">
                © 2024 Dr. Basavaiah Ayurveda Hospital. All rights reserved.
              </p>
              <p className="text-pure-white/60 text-sm">
                Established 1938 | Trusted by 50,000+ patients
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-pure-white/60 hover:text-gold-soft transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-pure-white/60 hover:text-gold-soft transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-pure-white/60 hover:text-gold-soft transition-colors">
                Medical Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;