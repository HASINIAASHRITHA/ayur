import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  emergencyPhone: string;
  workingHours: string;
  aboutText: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

const defaultSettings: SiteSettings = {
  siteName: 'Dr. Basavaiah Ayurveda Hospital',
  siteDescription: 'Authentic Ayurvedic healing since 1938',
  contactPhone: '+91-891-123-4567',
  contactEmail: 'info@basavaiahayurveda.com',
  address: 'Venkataraju Nagar, Visakhapatnam, Andhra Pradesh',
  emergencyPhone: '+91-891-987-6543',
  workingHours: 'Mon-Sat: 8:00 AM - 8:00 PM, Sun: 9:00 AM - 6:00 PM',
  aboutText: 'Experience the power of authentic Ayurvedic healing at Dr. Basavaiah Ayurveda Hospital. Trusted by over 50,000 patients since 1938.',
  socialMedia: {
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: ''
  },
  seo: {
    metaTitle: 'Dr. Basavaiah Ayurveda Hospital | Authentic Ayurvedic Treatment Since 1938',
    metaDescription: 'Experience authentic Ayurvedic healing at Dr. Basavaiah Ayurveda Hospital in Visakhapatnam. Trusted by 50,000+ patients since 1938.',
    keywords: 'ayurveda hospital, ayurvedic treatment, natural healing, visakhapatnam, dr basavaiah'
  }
};

export const useSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'settings', 'site'), 
      (doc) => {
        if (doc.exists()) {
          setSettings({ ...defaultSettings, ...doc.data() });
        } else {
          setSettings(defaultSettings);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to settings:', error);
        setSettings(defaultSettings);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { settings, loading };
};