import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Appointment } from './useFirestore';
import { useToast } from '@/hooks/use-toast';

export const useRealtimeAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appointmentsData: Appointment[] = [];
      const newPendingAppointments: Appointment[] = [];
      
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const appointmentData = {
            id: change.doc.id,
            ...change.doc.data()
          } as Appointment;
          
          // Check if this is a new pending appointment (just added)
          if (appointmentData.status === 'Pending' && 
              appointmentData.createdAt instanceof Timestamp &&
              Date.now() - appointmentData.createdAt.toMillis() < 5000) { // Within last 5 seconds
            newPendingAppointments.push(appointmentData);
          }
        }
      });
      
      // Update all appointments
      snapshot.forEach((doc) => {
        appointmentsData.push({
          id: doc.id,
          ...doc.data()
        } as Appointment);
      });
      
      setAppointments(appointmentsData);
      setLoading(false);
      
      // Show toast for new appointments
      newPendingAppointments.forEach((appointment) => {
        toast({
          title: "New Appointment! 🎉",
          description: `${appointment.name} has booked an appointment`,
        });
      });
    }, (error) => {
      console.error('Error listening to appointments:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  return { appointments, loading };
};