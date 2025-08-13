import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, User } from 'lucide-react';

// Add a default patient image as a fallback
const DEFAULT_PATIENT_IMAGE = '/patient-default.jpg';

interface TestimonialCardProps {
  name: string;
  content: string;
  rating: number;
  location?: string;
  image?: string;
  date?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  content,
  rating,
  location,
  image,
  date
}) => {
  // Handle image loading error by falling back to default image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_PATIENT_IMAGE;
    e.currentTarget.onerror = null; // Prevent infinite loops
  };

  return (
    <Card className="shadow-premium h-full flex flex-col">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-parchment mr-4">
            {image ? (
              <img 
                src={image.startsWith('http') ? image : `/${image}`} 
                alt={`${name} portrait`}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full bg-gradient-gold flex items-center justify-center">
                <User className="text-deep-brown w-8 h-8" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-heading font-bold text-deep-brown">{name}</h3>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? 'text-soft-gold fill-soft-gold' : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="text-deep-brown/80 italic mb-4 flex-grow">{content}</p>
        
        <div className="flex flex-wrap justify-between items-center text-xs text-muted-foreground mt-auto">
          {location && (
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {location}
            </div>
          )}
          {date && <div>{date}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
