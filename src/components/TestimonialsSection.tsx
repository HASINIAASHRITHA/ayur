import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useFirestore } from '@/hooks/useFirestore';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const { testimonials: firestoreTestimonials, fetchTestimonials, loading } = useFirestore();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Only show admin-added testimonials
  const testimonialsToDisplay = firestoreTestimonials;

  return (
    <section id="testimonials" className="py-20 bg-pure-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-deep-brown mb-6">
            Patient Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from our patients who have experienced the transformative power of 
            authentic Ayurvedic healing at our hospital.
          </p>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-deep-brown/60">Loading testimonials...</p>
          </div>
        ) : testimonialsToDisplay.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-deep-brown/60">No testimonials available. Please check back later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsToDisplay.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="group hover-lift animate-fade-up bg-pure-white border-gold-soft/20 shadow-soft hover:shadow-gold transition-all duration-300 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-gold-soft/20">
                <Quote className="w-8 h-8" />
              </div>

              <CardContent className="p-6">
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-soft text-gold-soft" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Patient Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center overflow-hidden">
                      {testimonial.imageUrl ? (
                        <img 
                          src={testimonial.imageUrl} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-deep-brown font-bold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-brown">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location display */}
                {testimonial.location && (
                  <div className="mt-4 pt-4 border-t border-parchment">
                    <span className="inline-block bg-herbal-primary/10 text-herbal-primary px-3 py-1 rounded-full text-sm font-medium">
                      {testimonial.location}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        {/* Statistics Bar */}
        <div className="mt-16 bg-gradient-hero rounded-2xl p-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-pure-white font-heading mb-2">4.9/5</div>
              <div className="text-pure-white/80">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pure-white font-heading mb-2">2,500+</div>
              <div className="text-pure-white/80">Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pure-white font-heading mb-2">98%</div>
              <div className="text-pure-white/80">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pure-white font-heading mb-2">85%</div>
              <div className="text-pure-white/80">Repeat Patients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;