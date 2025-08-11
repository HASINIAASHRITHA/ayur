import React from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SuccessToastProps {
  title: string;
  description: string;
  visible: boolean;
  onClose: () => void;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ title, description, visible, onClose }) => {
  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="relative max-w-md w-full bg-gradient-to-br from-herbal-primary to-herbal-secondary text-pure-white shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-herbal-primary/90 to-herbal-secondary/90 rounded-lg"></div>
        <div className="relative p-8 text-center">
          {/* Decorative elements */}
          <div className="absolute top-2 left-2">
            <Sparkles className="w-4 h-4 text-gold-soft animate-pulse" />
          </div>
          <div className="absolute top-2 right-2">
            <Sparkles className="w-4 h-4 text-gold-soft animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute bottom-2 left-4">
            <Sparkles className="w-3 h-3 text-gold-soft animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute bottom-2 right-4">
            <Sparkles className="w-3 h-3 text-gold-soft animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
          
          {/* Success icon with animation */}
          <div className="relative mx-auto mb-4 w-16 h-16 bg-pure-white/20 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle className="w-10 h-10 text-pure-white" />
            <div className="absolute inset-0 bg-pure-white/10 rounded-full animate-ping"></div>
          </div>
          
          {/* Content */}
          <h3 className="font-heading text-xl font-bold mb-2">{title}</h3>
          <p className="text-pure-white/90 leading-relaxed">{description}</p>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-pure-white/20 hover:bg-pure-white/30 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            Continue
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SuccessToast;