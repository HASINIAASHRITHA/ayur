import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useFirestore, Service } from '@/hooks/useFirestore';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import AppointmentSuccessToast from '@/components/ui/appointment-success-toast';
import { sendWhatsAppNotification } from '@/lib/whatsapp';

interface AppointmentBookingModalProps {
  open: boolean;
  onClose: () => void;
  services: Service[];
}

const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  open,
  onClose,
  services
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceId: '',
    preferredDate: undefined as Date | undefined,
    preferredTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const { addAppointment } = useFirestore();
  const { toast } = useToast();

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const appointmentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        serviceId: formData.serviceId || undefined,
        preferredDate: formData.preferredDate ? format(formData.preferredDate, 'yyyy-MM-dd') : undefined,
        preferredTime: formData.preferredTime || undefined,
        status: 'Pending' as const
      };

      await addAppointment(appointmentData);

      // Send WhatsApp notification to both admin and user
      try {
        await sendWhatsAppNotification('appointment', appointmentData, true);
      } catch (whatsappError) {
        console.error('WhatsApp notification failed:', whatsappError);
        // Don't fail the appointment booking if WhatsApp fails
      }

      // Show success toast
      setShowSuccessToast(true);

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        serviceId: '',
        preferredDate: undefined,
        preferredTime: ''
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error Booking Appointment",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
      console.error("Error booking appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppointmentSuccessToast
        visible={showSuccessToast}
        title="Appointment Booked Successfully! 🎉"
        description="We'll contact you within 24 hours to confirm your appointment details. Thank you for choosing Dr. Basavaiah Ayurveda Hospital!"
        onClose={() => setShowSuccessToast(false)}
      />
      
      <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-bold text-deep-brown">
            Book Your Appointment
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to schedule your consultation with our Ayurvedic specialists.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-deep-brown mb-2">
                Full Name *
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-deep-brown mb-2">
                Phone Number *
              </label>
              <Input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91-XXXXXXXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-deep-brown mb-2">
              Email Address *
            </label>
            <Input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-deep-brown mb-2">
              Service (Optional)
            </label>
            <Select value={formData.serviceId} onValueChange={(value) => setFormData({ ...formData, serviceId: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service (optional)" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id!}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-deep-brown mb-2">
                Preferred Date (Optional)
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.preferredDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.preferredDate ? format(formData.preferredDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.preferredDate}
                    onSelect={(date) => setFormData({ ...formData, preferredDate: date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm font-medium text-deep-brown mb-2">
                Preferred Time (Optional)
              </label>
              <Select value={formData.preferredTime} onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-deep-brown mb-2">
              Health Concerns / Message
            </label>
            <Textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Please describe your health concerns or any specific questions..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="hero" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                'Book Appointment'
              )}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            We'll contact you within 24 hours to confirm your appointment details.
          </p>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default AppointmentBookingModal;