import React from 'react';
import { Heart, Award, Users, Leaf } from 'lucide-react';
import treatmentRoom from '@/assets/treatment-room.jpg';

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Every patient is treated with genuine care and personal attention, ensuring comfort throughout their healing journey."
    },
    {
      icon: Award,
      title: "Excellence in Treatment",
      description: "Combining traditional Ayurvedic wisdom with modern medical standards to deliver exceptional healthcare outcomes."
    },
    {
      icon: Users,
      title: "Expert Practitioners",
      description: "Our team of experienced Ayurvedic doctors and therapists are dedicated to your complete wellness and recovery."
    },
    {
      icon: Leaf,
      title: "Natural Healing",
      description: "Using authentic herbs and natural remedies to treat the root cause of illness, not just the symptoms."
    }
  ];

  return (
    <section id="about" className="py-20 bg-pure-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-deep-brown mb-6">
            About Dr. Basavaiah Ayurveda Hospital
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded in 1938, we have been a beacon of traditional Ayurvedic healing, 
            combining ancient wisdom with compassionate modern care.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <img
              src={treatmentRoom}
              alt="Traditional Ayurvedic Treatment Room"
              className="rounded-2xl shadow-premium w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-gold-soft text-deep-brown rounded-xl p-6 shadow-gold">
              <div className="text-3xl font-bold font-heading">85+</div>
              <div className="text-sm font-medium">Years of Heritage</div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="font-heading text-3xl font-bold text-deep-brown">
              A Legacy of Natural Healing
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dr. Basavaiah Ayurveda Hospital has been serving the community for over eight decades, 
              establishing itself as a trusted center for authentic Ayurvedic treatment. Our founder's 
              vision of bringing traditional healing to modern times continues to guide our practice today.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              We have successfully treated over 50,000 patients, specializing in chronic conditions, 
              wellness programs, and preventive healthcare through time-tested Ayurvedic principles.
            </p>

            <div className="bg-gradient-primary rounded-xl p-6">
              <h4 className="font-heading text-xl font-bold text-deep-brown mb-3">Our Mission</h4>
              <p className="text-deep-brown/80">
                To provide authentic, personalized Ayurvedic healthcare that treats not just symptoms 
                but addresses the root cause of illness, promoting complete physical, mental, and spiritual wellness.
              </p>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={value.title}
              className="text-center group hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gold rounded-full mb-6 group-hover:shadow-gold transition-all duration-300">
                <value.icon className="w-8 h-8 text-deep-brown" />
              </div>
              <h4 className="font-heading text-xl font-bold text-deep-brown mb-3">
                {value.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;