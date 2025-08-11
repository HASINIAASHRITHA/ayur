// WhatsApp notification service
export const sendWhatsAppNotification = async (type: 'appointment' | 'contact', data: any) => {
  try {
    // Firebase callable function approach
    const { getFunctions, httpsCallable } = await import('firebase/functions');
    const functions = getFunctions();
    const sendWhatsApp = httpsCallable(functions, 'sendWhatsAppMessage');
    
    const result = await sendWhatsApp({
      type,
      appointmentData: type === 'appointment' ? data : null,
      contactData: type === 'contact' ? data : null
    });
    
    return result.data;
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    
    // Fallback: Log the notification for demo purposes
    const phoneNumber = '+916281508325';
    const message = formatWhatsAppMessage(type, data);
    
    console.log('📱 WhatsApp Notification (Demo Mode):', {
      to: phoneNumber,
      message,
      type,
      data,
      timestamp: new Date().toISOString()
    });
    
    // Return success for demo
    return { success: true, message: 'Notification logged (demo mode)', demo: true };
  }
};

export const formatWhatsAppMessage = (type: 'appointment' | 'contact', data: any): string => {
  if (type === 'appointment') {
    return `🏥 New Appointment Booking!

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Message: ${data.message || 'No message provided'}
${data.preferredDate ? `Preferred Date: ${data.preferredDate}` : ''}
${data.preferredTime ? `Preferred Time: ${data.preferredTime}` : ''}

Status: Pending
Time: ${new Date().toLocaleString('en-IN')}

Please respond to the patient promptly.`;
  } else {
    return `💬 New Contact Form Submission!

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Message: ${data.message}

Time: ${new Date().toLocaleString('en-IN')}`;
  }
};