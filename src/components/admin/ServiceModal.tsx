import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useFirestore, Service } from '@/hooks/useFirestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  editingService?: Service | null;
  onServiceUpdated?: () => void;  // Add callback for when service is updated
}

const ServiceModal: React.FC<ServiceModalProps> = ({ 
  open, 
  onClose, 
  editingService,
  onServiceUpdated 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: '',
    icon: '',
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { addService, updateService, uploadImage, fetchServices } = useFirestore();
  const { toast } = useToast();

  // Make sure form is reset when modal opens/closes
  useEffect(() => {
    if (!open) {
      // Reset form when modal closes
      setFormData({
        title: '',
        description: '',
        features: '',
        icon: '',
        imageUrl: ''
      });
      setImageFile(null);
      return;
    }
    
    if (editingService) {
      setFormData({
        title: editingService.title || '',
        description: editingService.description || '',
        features: editingService.features.join(', ') || '',
        icon: editingService.icon || '',
        imageUrl: editingService.imageUrl || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        features: '',
        icon: '',
        imageUrl: ''
      });
    }
    setImageFile(null);
  }, [editingService, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const serviceData = {
        title: formData.title,
        description: formData.description,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        icon: formData.icon,
        imageUrl
      };

      if (editingService?.id) {
        // Update existing service
        await updateService(editingService.id, serviceData);
        toast({
          title: "Service Updated",
          description: "Service has been updated successfully",
        });
        
        // Force refresh services list
        await fetchServices();
        
        // Call callback if provided
        if (onServiceUpdated) {
          onServiceUpdated();
        }
      } else {
        // Add new service
        await addService(serviceData);
        toast({
          title: "Service Added",
          description: "New service has been added successfully",
        });
        
        // Force refresh services list
        await fetchServices();
      }

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save service",
        variant: "destructive",
      });
      console.error("Error saving service:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-bold text-deep-brown">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </DialogTitle>
          <DialogDescription>
            {editingService ? 'Update service information' : 'Add a new service to your website'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Service Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., General Consultation"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of the service"
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Input
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="e.g., Detailed assessment, Personalized treatment, Lifestyle guidance"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon Name (Lucide React)</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="e.g., Stethoscope, Brain, Heart"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Service Image</Label>
            <div className="space-y-3">
              <div>
                <Label className="text-sm">Image URL</Label>
                <Input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
              </div>
              <div className="text-center text-sm text-muted-foreground">or</div>
              <div>
                <Label className="text-sm">Upload File</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            {formData.imageUrl && !imageFile && (
              <p className="text-sm text-muted-foreground">Current image will be used</p>
            )}
            {imageFile && (
              <p className="text-sm text-herbal-primary">New image selected: {imageFile.name}</p>
            )}
          </div>

          <div className="flex gap-3 pt-6 border-t sticky bottom-0 bg-white">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading} 
              className="flex-1 bg-herbal-primary hover:bg-herbal-primary/90"
              variant="default"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                editingService ? 'Update Service' : 'Add Service'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;