import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFirestore, Testimonial } from '@/hooks/useFirestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';

interface TestimonialModalProps {
  open: boolean;
  onClose: () => void;
  editingTestimonial?: Testimonial | null;
}

const TestimonialModal: React.FC<TestimonialModalProps> = ({ open, onClose, editingTestimonial }) => {
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    rating: 5,
    location: '',
    imageUrl: '',
    service: '',
    date: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { addTestimonial, updateTestimonial, uploadImage } = useFirestore();
  const { toast } = useToast();

  useEffect(() => {
    if (editingTestimonial) {
      console.log('Editing testimonial:', editingTestimonial); // Debug log
      setFormData({
        name: editingTestimonial.name || '',
        content: editingTestimonial.content || '',
        rating: editingTestimonial.rating || 5,
        location: editingTestimonial.location || '',
        imageUrl: editingTestimonial.imageUrl || '',
        service: (editingTestimonial as any).service || '',
        date: (editingTestimonial as any).date || ''
      });
    } else {
      setFormData({
        name: '',
        content: '',
        rating: 5,
        location: '',
        imageUrl: '',
        service: '',
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
    }
    setImageFile(null);
  }, [editingTestimonial, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const testimonialData = {
        name: formData.name,
        content: formData.content,
        rating: formData.rating,
        location: formData.location,
        imageUrl,
        service: formData.service,
        date: formData.date
      };

      console.log('Submitting testimonial data:', testimonialData); // Debug log

      if (editingTestimonial?.id) {
        console.log('Updating testimonial with ID:', editingTestimonial.id); // Debug log
        await updateTestimonial(editingTestimonial.id, testimonialData);
        toast({
          title: "Testimonial Updated",
          description: "Testimonial has been updated successfully",
        });
      } else {
        await addTestimonial(testimonialData);
        toast({
          title: "Testimonial Added",
          description: "New testimonial has been added successfully",
        });
      }

      onClose();
    } catch (error) {
      console.error('Error saving testimonial:', error); // Debug log
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      });
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
            {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </DialogTitle>
          <DialogDescription>
            {editingTestimonial ? 'Update testimonial information' : 'Add a new patient testimonial'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Patient Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Ramesh Kumar"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Testimonial Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Patient's feedback and experience"
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select 
              value={formData.rating.toString()} 
              onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Bangalore, Karnataka"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Panchakarma Therapy">Panchakarma Therapy</SelectItem>
                  <SelectItem value="Herbal Medicine">Herbal Medicine</SelectItem>
                  <SelectItem value="Yoga Therapy">Yoga Therapy</SelectItem>
                  <SelectItem value="Ayurvedic Consultation">Ayurvedic Consultation</SelectItem>
                  <SelectItem value="Ayurvedic Massage">Ayurvedic Massage</SelectItem>
                  <SelectItem value="Pulse Diagnosis">Pulse Diagnosis</SelectItem>
                  <SelectItem value="Stress Management">Stress Management</SelectItem>
                  <SelectItem value="Skin Treatment">Skin Treatment</SelectItem>
                  <SelectItem value="Neurological Treatment">Neurological Treatment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="e.g., March 2024"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Patient Photo (Optional)</Label>
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

          <div className="flex gap-3 pt-6 border-t">
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
                editingTestimonial ? 'Update Testimonial' : 'Save Testimonial'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialModal;