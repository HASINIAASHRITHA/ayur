import React, { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFirestore } from '@/hooks/useFirestore';
import { useRealtimeAppointments } from '@/hooks/useRealtimeAppointments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogOut, Plus, Edit, Trash2, Users, FileText, MessageSquare, Settings, Calendar, CheckCircle, XCircle, Clock, Search, Filter, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ServiceModal from '@/components/admin/ServiceModal';
import BlogModal from '@/components/admin/BlogModal';
import TestimonialModal from '@/components/admin/TestimonialModal';
import SettingsModal from '@/components/admin/SettingsModal';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { 
    services, 
    blogPosts, 
    testimonials, 
    deleteService, 
    deleteBlogPost, 
    deleteTestimonial,
    updateAppointment,
    deleteAppointment,
    loading 
  } = useFirestore();
  
  // Use real-time appointments
  const { appointments } = useRealtimeAppointments();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (type: 'service' | 'blog' | 'testimonial', item: any) => {
    setEditingItem(item);
    if (type === 'service') setServiceModalOpen(true);
    if (type === 'blog') setBlogModalOpen(true);
    if (type === 'testimonial') setTestimonialModalOpen(true);
  };

  const handleDelete = async (type: 'service' | 'blog' | 'testimonial' | 'appointment', id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      if (type === 'service') await deleteService(id);
      if (type === 'blog') await deleteBlogPost(id);
      if (type === 'testimonial') await deleteTestimonial(id);
      if (type === 'appointment') await deleteAppointment(id);
      
      toast({
        title: "Deleted",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete ${type}`,
        variant: "destructive",
      });
    }
  };

  const closeModals = () => {
    setServiceModalOpen(false);
    setBlogModalOpen(false);
    setTestimonialModalOpen(false);
    setSettingsModalOpen(false);
    setEditingItem(null);
  };

  // Filter and search appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      const matchesSearch = searchTerm === '' || 
        appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.phone.includes(searchTerm) ||
        (appointment.message && appointment.message.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <div className="bg-pure-white shadow-soft border-b border-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-heading font-bold text-deep-brown">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {currentUser?.email}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSettingsModalOpen(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-pure-white shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-gold rounded-full">
                  <Settings className="w-6 h-6 text-deep-brown" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Services</p>
                  <p className="text-2xl font-bold text-deep-brown">{services.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-pure-white shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-gold rounded-full">
                  <FileText className="w-6 h-6 text-deep-brown" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Blog Posts</p>
                  <p className="text-2xl font-bold text-deep-brown">{blogPosts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-pure-white shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-gold rounded-full">
                  <MessageSquare className="w-6 h-6 text-deep-brown" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Testimonials</p>
                  <p className="text-2xl font-bold text-deep-brown">{testimonials.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-pure-white shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-gold rounded-full">
                  <Calendar className="w-6 h-6 text-deep-brown" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Pending Appointments</p>
                  <p className="text-2xl font-bold text-deep-brown">
                    {appointments.filter(apt => apt.status === 'Pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Card className="bg-pure-white shadow-premium">
          <CardHeader>
            <CardTitle className="font-heading text-2xl font-bold text-deep-brown">
              Content Management
            </CardTitle>
            <CardDescription>
              Manage your hospital's website content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="appointments" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="blog">Blog Posts</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              </TabsList>

              {/* Appointments Tab */}
              <TabsContent value="appointments" className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h3 className="text-lg font-semibold text-deep-brown">Manage Appointments</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      Pending: {appointments.filter(apt => apt.status === 'Pending').length}
                    </Badge>
                    <Badge variant="secondary">
                      Confirmed: {appointments.filter(apt => apt.status === 'Confirmed').length}
                    </Badge>
                    <Badge variant="secondary">
                      Total: {appointments.length}
                    </Badge>
                  </div>
                </div>
                
                {/* Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search appointments (name, email, phone, message)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4">
                  {filteredAppointments.map((appointment) => (
                    <Card key={appointment.id} className="border-gold-soft/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-deep-brown">{appointment.name}</h4>
                              <Badge 
                                variant={
                                  appointment.status === 'Pending' ? 'default' :
                                  appointment.status === 'Confirmed' ? 'secondary' :
                                  appointment.status === 'Canceled' ? 'destructive' : 'outline'
                                }
                                className="text-xs"
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p>📧 {appointment.email}</p>
                              <p>📱 {appointment.phone}</p>
                              {appointment.message && <p>💬 {appointment.message}</p>}
                              {appointment.preferredDate && (
                                <p>📅 Preferred: {appointment.preferredDate} {appointment.preferredTime}</p>
                              )}
                              {appointment.adminNotes && (
                                <p className="text-blue-600">📝 Notes: {appointment.adminNotes}</p>
                              )}
                              <p className="text-xs">
                                🕒 {appointment.createdAt?.toDate?.()?.toLocaleString() || 'No date'}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            {appointment.status === 'Pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => updateAppointment(appointment.id!, { status: 'Confirmed' })}
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Confirm
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => updateAppointment(appointment.id!, { status: 'Canceled' })}
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Cancel
                                </Button>
                              </>
                            )}
                            {appointment.status === 'Confirmed' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateAppointment(appointment.id!, { status: 'Completed' })}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Complete
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDelete('appointment' as any, appointment.id!)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredAppointments.length === 0 && appointments.length > 0 && (
                    <Card className="border-gold-soft/20">
                      <CardContent className="p-8 text-center">
                        <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No appointments match your search criteria</p>
                        <Button 
                          variant="outline" 
                          onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                          className="mt-2"
                        >
                          Clear Filters
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                  {appointments.length === 0 && (
                    <Card className="border-gold-soft/20">
                      <CardContent className="p-8 text-center">
                        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No appointments yet</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-deep-brown">Manage Services</h3>
                  <Button onClick={() => setServiceModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </div>
                <div className="grid gap-4">
                  {services.map((service) => (
                    <Card key={service.id} className="border-gold-soft/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-deep-brown">{service.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {service.features.map((feature, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEdit('service', service)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDelete('service', service.id!)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Blog Posts Tab */}
              <TabsContent value="blog" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-deep-brown">Manage Blog Posts</h3>
                  <Button onClick={() => setBlogModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Blog Post
                  </Button>
                </div>
                <div className="grid gap-4">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="border-gold-soft/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-deep-brown">{post.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                            <p className="text-xs text-muted-foreground mt-2">By {post.author}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEdit('blog', post)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDelete('blog', post.id!)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Testimonials Tab */}
              <TabsContent value="testimonials" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-deep-brown">Manage Testimonials</h3>
                  <Button onClick={() => setTestimonialModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>
                <div className="grid gap-4">
                  {testimonials.length === 0 ? (
                    <Card className="border-gold-soft/20">
                      <CardContent className="p-8 text-center">
                        <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No testimonials yet</p>
                        <p className="text-sm text-muted-foreground mt-2">Add your first patient testimonial</p>
                      </CardContent>
                    </Card>
                  ) : (
                    testimonials.map((testimonial) => (
                      <Card key={testimonial.id} className="border-gold-soft/20">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-deep-brown">{testimonial.name}</h4>
                                <div className="flex text-gold-soft">
                                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <span key={i}>★</span>
                                  ))}
                                </div>
                                {(testimonial as any).service && (
                                  <Badge variant="secondary" className="text-xs">
                                    {(testimonial as any).service}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1 mb-2">
                                "{testimonial.content}"
                              </p>
                              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                {testimonial.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {testimonial.location}
                                  </span>
                                )}
                                {(testimonial as any).date && (
                                  <span>📅 {(testimonial as any).date}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEdit('testimonial', testimonial)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDelete('testimonial', testimonial.id!)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ServiceModal 
        open={serviceModalOpen} 
        onClose={closeModals}
        editingService={editingItem}
      />
      <BlogModal 
        open={blogModalOpen} 
        onClose={closeModals}
        editingPost={editingItem}
      />
      <TestimonialModal 
        open={testimonialModalOpen} 
        onClose={closeModals}
        editingTestimonial={editingItem}
      />
      <SettingsModal 
        open={settingsModalOpen} 
        onClose={() => setSettingsModalOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;