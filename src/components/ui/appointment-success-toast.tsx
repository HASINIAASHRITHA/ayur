import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppointmentSuccessToastProps {
  visible: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

const AppointmentSuccessToast: React.FC<AppointmentSuccessToastProps> = ({
  visible,
  title,
  description,
  onClose
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-brown/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-pure-white rounded-lg shadow-premium border-2 border-gold-soft max-w-md mx-4 animate-scale-in">
        {/* Decorative Header */}
        <div className="bg-gradient-gold p-6 rounded-t-lg text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-soft/30 to-herbal-primary/20"></div>
          <div className="relative">
            <div className="w-16 h-16 bg-pure-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-soft">
              <CheckCircle className="w-8 h-8 text-herbal-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold text-deep-brown">
              {title}
            </h3>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-herbal-primary/20 rounded-full"></div>
          <div className="absolute top-4 right-4 w-3 h-3 bg-gold-soft/30 rounded-full"></div>
          <div className="absolute bottom-2 left-6 w-2 h-2 bg-herbal-primary/15 rounded-full"></div>
          <div className="absolute bottom-4 right-2 w-5 h-5 bg-gold-soft/20 rounded-full"></div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-muted-foreground text-center mb-6 leading-relaxed">
            {description}
          </p>
          
          {/* Decorative Divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-herbal-primary rounded-full"></div>
              <div className="w-2 h-2 bg-gold-soft rounded-full"></div>
              <div className="w-2 h-2 bg-herbal-primary rounded-full"></div>
            </div>
          </div>
          
          {/* Close Button */}
          <div className="flex justify-center">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gold-soft text-herbal-primary hover:bg-gold-soft/10 hover:border-herbal-primary transition-all duration-300"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Perfect!
            </Button>
          </div>
        </div>
        
        {/* Close X Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 text-deep-brown hover:bg-pure-white/50 rounded-full"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AppointmentSuccessToast;