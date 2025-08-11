import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadToCloudinary } from '@/lib/cloudinary';

export interface Service {
  id?: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  icon: string;
  createdAt?: Timestamp;
}

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Testimonial {
  id?: string;
  name: string;
  rating: number;
  content: string;
  imageUrl?: string;
  location?: string;
  service?: string;
  date?: string;
  createdAt?: Timestamp;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: Timestamp;
}

export interface Appointment {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceId?: string;
  preferredDate?: string;
  preferredTime?: string;
  status: 'Pending' | 'Confirmed' | 'Canceled' | 'Completed';
  adminNotes?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);

  // Services
  const [services, setServices] = useState<Service[]>([]);
  
  const fetchServices = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'services'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const servicesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      setLoading(true);
      await addDoc(collection(db, 'services'), {
        ...service,
        createdAt: Timestamp.now()
      });
      await fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id: string, service: Partial<Service>) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'services', id), service);
      await fetchServices();
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'services', id));
      await fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Blog Posts
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setBlogPosts(postsData);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    try {
      setLoading(true);
      await addDoc(collection(db, 'blogPosts'), {
        ...post,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      await fetchBlogPosts();
    } catch (error) {
      console.error('Error adding blog post:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'blogPosts', id), {
        ...post,
        updatedAt: Timestamp.now()
      });
      await fetchBlogPosts();
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'blogPosts', id));
      await fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Testimonials
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const testimonialsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Testimonial[];
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    try {
      setLoading(true);
      await addDoc(collection(db, 'testimonials'), {
        ...testimonial,
        createdAt: Timestamp.now()
      });
      await fetchTestimonials();
    } catch (error) {
      console.error('Error adding testimonial:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTestimonial = async (id: string, testimonial: Partial<Testimonial>) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'testimonials', id), testimonial);
      await fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'testimonials', id));
      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const appointmentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (appointment: Omit<Appointment, 'id'>) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, 'appointments'), {
        ...appointment,
        status: 'Pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      await fetchAppointments();
      return docRef.id;
    } catch (error) {
      console.error('Error adding appointment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id: string, appointment: Partial<Appointment>) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'appointments', id), {
        ...appointment,
        updatedAt: Timestamp.now()
      });
      await fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'appointments', id));
      await fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Contact Messages (now creates appointments)
  const submitContactMessage = async (message: Omit<ContactMessage, 'id'>) => {
    try {
      setLoading(true);
      
      // Create as appointment instead of contact message
      const appointmentData: Omit<Appointment, 'id'> = {
        name: message.name,
        email: message.email,
        phone: message.message.split('\n')[0].replace('Phone: ', ''),
        message: message.message.split('\n\n')[1]?.replace('Message: ', '') || '',
        status: 'Pending'
      };
      
      return await addAppointment(appointmentData);
    } catch (error) {
      console.error('Error submitting contact message:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Upload helper
  const uploadImage = async (file: File): Promise<string> => {
    return await uploadToCloudinary(file);
  };

  useEffect(() => {
    fetchServices();
    fetchBlogPosts();
    fetchTestimonials();
    fetchAppointments();
  }, []);

  return {
    loading,
    services,
    blogPosts,
    testimonials,
    appointments,
    addService,
    updateService,
    deleteService,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    submitContactMessage,
    uploadImage,
    fetchServices,
    fetchBlogPosts,
    fetchTestimonials,
    fetchAppointments
  };
};