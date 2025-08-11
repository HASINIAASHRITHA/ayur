import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save, Globe, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

interface SiteSettings {
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

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchSettings();
    }
  }, [open]);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'settings', 'site');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setSettings({ ...defaultSettings, ...docSnap.data() });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load settings',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'site'), settings, { merge: true });
      
      toast({
        title: 'Settings Saved',
        description: 'Site settings have been updated successfully'
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSettings = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedSettings = (section: string, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof SiteSettings] as any,
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Loading settings...</span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Site Settings
          </DialogTitle>
          <DialogDescription>
            Manage your website settings, contact information, and SEO configuration
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Basic site information and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => updateSettings('siteName', e.target.value)}
                    placeholder="Hospital name"
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => updateSettings('siteDescription', e.target.value)}
                    placeholder="Brief description"
                  />
                </div>
                <div>
                  <Label htmlFor="aboutText">About Text</Label>
                  <Textarea
                    id="aboutText"
                    value={settings.aboutText}
                    onChange={(e) => updateSettings('aboutText', e.target.value)}
                    placeholder="About hospital description"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="workingHours">Working Hours</Label>
                  <Input
                    id="workingHours"
                    value={settings.workingHours}
                    onChange={(e) => updateSettings('workingHours', e.target.value)}
                    placeholder="Working hours"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Information
                </CardTitle>
                <CardDescription>Hospital contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactPhone">Main Phone</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => updateSettings('contactPhone', e.target.value)}
                    placeholder="+91-XXX-XXX-XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={settings.emergencyPhone}
                    onChange={(e) => updateSettings('emergencyPhone', e.target.value)}
                    placeholder="+91-XXX-XXX-XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSettings('contactEmail', e.target.value)}
                    placeholder="info@hospital.com"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={settings.address}
                    onChange={(e) => updateSettings('address', e.target.value)}
                    placeholder="Hospital address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Add your social media profile URLs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <div className="flex-1">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={settings.socialMedia.facebook}
                      onChange={(e) => updateNestedSettings('socialMedia', 'facebook', e.target.value)}
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <div className="flex-1">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={settings.socialMedia.instagram}
                      onChange={(e) => updateNestedSettings('socialMedia', 'instagram', e.target.value)}
                      placeholder="https://instagram.com/yourpage"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-blue-400" />
                  <div className="flex-1">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={settings.socialMedia.twitter}
                      onChange={(e) => updateNestedSettings('socialMedia', 'twitter', e.target.value)}
                      placeholder="https://twitter.com/yourpage"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-red-600" />
                  <div className="flex-1">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      value={settings.socialMedia.youtube}
                      onChange={(e) => updateNestedSettings('socialMedia', 'youtube', e.target.value)}
                      placeholder="https://youtube.com/yourchannel"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Search engine optimization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={settings.seo.metaTitle}
                    onChange={(e) => updateNestedSettings('seo', 'metaTitle', e.target.value)}
                    placeholder="SEO title (max 60 characters)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {settings.seo.metaTitle.length}/60 characters
                  </p>
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={settings.seo.metaDescription}
                    onChange={(e) => updateNestedSettings('seo', 'metaDescription', e.target.value)}
                    placeholder="SEO description (max 160 characters)"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {settings.seo.metaDescription.length}/160 characters
                  </p>
                </div>
                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Textarea
                    id="keywords"
                    value={settings.seo.keywords}
                    onChange={(e) => updateNestedSettings('seo', 'keywords', e.target.value)}
                    placeholder="Comma-separated keywords"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;