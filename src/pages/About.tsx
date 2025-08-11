import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDoctorImage } from '@/assets/doctor-images';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-16 bg-pure-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-deep-brown mb-6">
                About Dr. Basavaiah Ayurveda Hospital
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Since 1938, we have been pioneers in authentic Ayurvedic healing, 
                combining traditional wisdom with modern care.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-heading font-bold text-deep-brown mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 1938 by the visionary Dr. Basavaiah, our hospital began as a 
                    small clinic with a profound mission: to preserve and practice the ancient 
                    science of Ayurveda in its most authentic form.
                  </p>
                  <p>
                    For over eight decades, we have been at the forefront of Ayurvedic medicine, 
                    treating thousands of patients with natural, time-tested remedies. Our 
                    commitment to quality, authenticity, and patient care has made us a trusted 
                    name in holistic healthcare.
                  </p>
                  <p>
                    Today, we continue Dr. Basavaiah's legacy by combining traditional Ayurvedic 
                    principles with modern diagnostic tools and facilities, ensuring our patients 
                    receive the best of both worlds.
                  </p>
                </div>
              </div>
              <Card className="shadow-premium">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-gold rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-2xl font-bold text-deep-brown">1938</span>
                    </div>
                    <h3 className="text-xl font-semibold text-deep-brown mb-2">Founded</h3>
                    <p className="text-muted-foreground">
                      85+ years of authentic Ayurvedic healing
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-pure-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="shadow-premium">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">👁️</span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-deep-brown">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground text-center">
                    To be the leading center of excellence in Ayurvedic medicine, 
                    making authentic healing accessible to all while preserving 
                    ancient wisdom for future generations.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-premium">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-deep-brown">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground text-center">
                    To provide compassionate, personalized Ayurvedic care using 
                    traditional methods and natural remedies, promoting holistic 
                    wellness and sustainable health for every patient.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-deep-brown mb-4">
                Our Expert Team
              </h2>
              <p className="text-xl text-muted-foreground">
                Experienced practitioners dedicated to your wellness
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Dr. Basavaiah */}
              <Card className="shadow-premium hover-lift transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-gold-soft shadow-premium">
                    <img
                      src={getDoctorImage('Dr. Basavaiah')}
                      alt="Dr. Basavaiah"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== '/doctor-images/male-doctor.jpg') {
                          target.src = '/doctor-images/male-doctor.jpg';
                          target.onerror = null; // Prevent infinite error loop
                        }
                      }}
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-deep-brown mb-2">Dr. Basavaiah</h4>
                  <Badge variant="secondary" className="mb-3">Founder</Badge>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pioneer in Ayurvedic medicine with over 50 years of experience
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <p>• BAMS, MD (Ayurveda)</p>
                    <p>• Panchakarma Specialist</p>
                    <p>• Herbal Medicine Expert</p>
                  </div>
                </CardContent>
              </Card>

              {/* Dr. Priya Sharma */}
              <Card className="shadow-premium hover-lift transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-gold-soft shadow-premium">
                    <img
                      src={getDoctorImage('Dr. Priya Sharma')}
                      alt="Dr. Priya Sharma"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== '/doctor-images/female-doctor.jpg') {
                          target.src = '/doctor-images/female-doctor.jpg';
                          target.onerror = null;
                        }
                      }}
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-deep-brown mb-2">Dr. Priya Sharma</h4>
                  <Badge variant="secondary" className="mb-3">Senior Consultant</Badge>
                  <p className="text-sm text-muted-foreground mb-4">
                    Specialist in women's health and digestive disorders
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <p>• BAMS, MS (Ayurveda)</p>
                    <p>• Gynecology Specialist</p>
                    <p>• Yoga Therapy Expert</p>
                  </div>
                </CardContent>
              </Card>

              {/* Dr. Rajesh Kumar */}
              <Card className="shadow-premium hover-lift transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-gold-soft shadow-premium">
                    <img
                      src={getDoctorImage('Dr. Rajesh Kumar')}
                      alt="Dr. Rajesh Kumar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== '/doctor-images/male-doctor.jpg') {
                          target.src = '/doctor-images/male-doctor.jpg';
                          target.onerror = null;
                        }
                      }}
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-deep-brown mb-2">Dr. Rajesh Kumar</h4>
                  <Badge variant="secondary" className="mb-3">Consultant</Badge>
                  <p className="text-sm text-muted-foreground mb-4">
                    Expert in joint disorders and pain management
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <p>• BAMS, PhD (Ayurveda)</p>
                    <p>• Orthopedic Specialist</p>
                    <p>• Marma Therapy Expert</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;