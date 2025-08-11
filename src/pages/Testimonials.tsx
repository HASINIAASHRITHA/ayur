import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';
import { useFirestore } from '@/hooks/useFirestore';

const Testimonials = () => {
  const { testimonials, fetchTestimonials, loading } = useFirestore();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-16 bg-pure-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-deep-brown mb-6">
              Patient Testimonials
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real stories from real patients who have experienced the healing power of authentic Ayurveda
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <Card className="shadow-premium text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-herbal-primary mb-2">10,000+</div>
                  <p className="text-muted-foreground">Happy Patients</p>
                </CardContent>
              </Card>
              <Card className="shadow-premium text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-herbal-primary mb-2">85+</div>
                  <p className="text-muted-foreground">Years of Service</p>
                </CardContent>
              </Card>
              <Card className="shadow-premium text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-herbal-primary mb-2">98%</div>
                  <p className="text-muted-foreground">Success Rate</p>
                </CardContent>
              </Card>
              <Card className="shadow-premium text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-herbal-primary mb-2">4.9/5</div>
                  <p className="text-muted-foreground">Average Rating</p>
                </CardContent>
              </Card>
            </div>

            {/* Testimonials Grid */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-deep-brown/60">Loading testimonials...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-deep-brown/60">No testimonials available yet. Please check back later.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card 
                    key={testimonial.id} 
                    className={`shadow-premium hover:shadow-xl transition-all duration-300 hover-lift relative overflow-hidden ${
                      index % 2 === 0 ? 'bg-pure-white' : 'bg-gradient-to-br from-parchment/30 to-pure-white'
                    }`}
                  >
                    {/* Decorative Quote Mark */}
                    <div className="absolute top-4 right-4 text-6xl text-gold-soft/20 font-serif leading-none">
                      "
                    </div>
                    
                    <CardContent className="p-6 relative">
                      <div className="flex items-start gap-4 mb-4">
                        {/* Profile Image Placeholder */}
                        <div className="w-16 h-16 bg-gradient-gold rounded-full flex-shrink-0 flex items-center justify-center shadow-soft">
                          {testimonial.imageUrl ? (
                            <img 
                              src={testimonial.imageUrl} 
                              alt={testimonial.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-herbal-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-lg font-bold text-herbal-primary">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-1 mb-2">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-gold-soft text-gold-soft" />
                            ))}
                          </div>
                          <Badge variant="secondary" className="text-xs bg-herbal-primary/10 text-herbal-primary border-herbal-primary/20">
                            {(testimonial as any).service || 'Ayurvedic Treatment'}
                          </Badge>
                        </div>
                      </div>
                      
                      <blockquote className="text-muted-foreground mb-6 italic leading-relaxed relative pl-4">
                        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-gold-soft to-herbal-primary rounded-full"></div>
                        "{testimonial.content}"
                      </blockquote>
                      
                      <div className="border-t border-parchment pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-deep-brown font-heading">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {testimonial.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground bg-parchment/50 px-2 py-1 rounded-full">
                              {(testimonial as any).date || 'Recent'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-gold-soft/30 rounded-full"></div>
                      <div className="absolute top-2 left-6 w-1 h-1 bg-herbal-primary/40 rounded-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-pure-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-heading font-bold text-deep-brown mb-6">
              Join Our Success Stories
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the transformative power of authentic Ayurveda and become our next success story
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Book Your Consultation
              </Button>
              <Button variant="outline" size="lg">
                Share Your Story
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;