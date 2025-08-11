import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Phone, MapPin, Clock, AlertTriangle, Heart, Brain, Bone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Emergency = () => {
  const emergencyTreatments = [
    {
      icon: Heart,
      title: "Cardiac Emergency",
      description: "Immediate Ayurvedic first aid for heart-related emergencies",
      treatment: "Apply gentle pressure on specific marma points, provide Arjuna powder with warm water if available, and ensure patient is in comfortable position."
    },
    {
      icon: Brain,
      title: "Neurological Crisis",
      description: "Quick response for seizures, fainting, or severe headaches",
      treatment: "Keep patient safe, apply cooling herbs like sandalwood paste on forehead, ensure proper ventilation, and monitor breathing."
    },
    {
      icon: Bone,
      title: "Fractures & Injuries",
      description: "Traditional approach to immediate injury management",
      treatment: "Immobilize affected area, apply turmeric paste for wounds, use cooling herbs for swelling, and prepare for professional medical care."
    },
    {
      icon: AlertTriangle,
      title: "Poisoning Emergency",
      description: "Traditional detoxification methods for emergency situations",
      treatment: "Induce vomiting if conscious, provide activated charcoal or clay water, apply cooling treatments, seek immediate medical attention."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Emergency Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-deep-brown mb-4">
              Emergency Care
            </h1>
            <p className="text-xl text-deep-brown/80 max-w-2xl mx-auto">
              Immediate assistance and traditional emergency treatments available 24/7
            </p>
          </div>

          {/* Emergency Contact */}
          <Card className="mb-12 bg-red-50 border-red-200">
            <CardHeader className="text-center">
              <CardTitle className="font-heading text-2xl font-bold text-red-700 flex items-center justify-center gap-3">
                <Phone className="w-6 h-6" />
                Emergency Hotline
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-red-700">
                +91 98481 62013
              </div>
              <p className="text-red-600">Available 24/7 for immediate assistance</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button 
                  variant="destructive" 
                  size="lg"
                  onClick={() => window.open('tel:+919848162013')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Emergency Line
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('sms:+919848162013')}
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  Send Emergency SMS
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hospital Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-herbal-primary" />
                  Hospital Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  Dr. Basavaiah Ayurveda Hospital
                </p>
                <p className="font-medium">
                  54- 5 - 6, Sivalayam Edhuruga,<br />
                  Lankada vari peta, Jagannaickpur,<br />
                  Kakinada, Andhra Pradesh 533002
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-herbal-primary" />
                  Emergency Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-green-600 mb-2">24/7 Emergency Care</p>
                <p className="text-muted-foreground">
                  Round-the-clock emergency services with experienced Ayurvedic practitioners and modern medical backup.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Treatments */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl font-bold text-deep-brown text-center mb-8">
              Emergency Treatment Guidelines
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {emergencyTreatments.map((treatment, index) => (
                <Card key={index} className="hover-lift">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                        <treatment.icon className="w-5 h-5 text-red-600" />
                      </div>
                      <CardTitle className="font-heading text-lg">{treatment.title}</CardTitle>
                    </div>
                    <CardDescription>{treatment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <p className="text-sm text-yellow-800">
                        <strong>Quick Action:</strong> {treatment.treatment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                  <p className="text-yellow-700 text-sm">
                    These guidelines are for immediate first aid only. Always seek professional medical attention for serious emergencies. 
                    Our Ayurvedic treatments complement but do not replace modern emergency medical care when needed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Emergency;