// WhatsApp notification service

/**
 * Send WhatsApp notification to both admin and user
 */
export const sendWhatsAppNotification = async (
  type: 'appointment' | 'contact', 
  data: any,
  sendToUser: boolean = true
) => {
  try {
    // Firebase callable function approach
    const { getFunctions, httpsCallable } = await import('firebase/functions');
    const functions = getFunctions();
    const sendWhatsApp = httpsCallable(functions, 'sendWhatsAppMessage');
    
    // Admin notification
    const adminResult = await sendWhatsApp({
      type,
      recipientType: 'admin',
      phoneNumber: '+916281508325', // Admin phone number
      appointmentData: type === 'appointment' ? data : null,
      contactData: type === 'contact' ? data : null
    });
    
    // User notification (if enabled and user phone is provided)
    let userResult = null;
    if (sendToUser && data.phone) {
      // Clean the phone number (ensure it has country code)
      const userPhone = formatPhoneNumber(data.phone);
      
      userResult = await sendWhatsApp({
        type,
        recipientType: 'user',
        phoneNumber: userPhone,
        appointmentData: type === 'appointment' ? data : null,
        contactData: type === 'contact' ? data : null
      });
    }
    
    return { adminResult: adminResult.data, userResult: userResult?.data };
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    
    // Fallback: Log the notification for demo purposes
    const adminPhone = '+916281508325';
    const userPhone = data.phone ? formatPhoneNumber(data.phone) : null;
    
    const adminMessage = formatWhatsAppMessage(type, data, 'admin');
    
    console.log('📱 WhatsApp Admin Notification (Demo Mode):', {
      to: adminPhone,
      message: adminMessage,
      type,
      data,
      timestamp: new Date().toISOString()
    });
    
    if (sendToUser && userPhone) {
      const userMessage = formatWhatsAppMessage(type, data, 'user');
      console.log('📱 WhatsApp User Notification (Demo Mode):', {
        to: userPhone,
        message: userMessage,
        type,
        data,
        timestamp: new Date().toISOString()
      });
    }
    
    // Return success for demo
    return { success: true, message: 'Notification logged (demo mode)', demo: true };
  }
};

/**
 * Format phone number to ensure it has country code
 */
const formatPhoneNumber = (phone: string): string => {
  // Remove spaces, dashes, etc.
  let cleaned = phone.replace(/\D/g, '');
  
  // If it doesn't start with country code, add Indian code
  if (!cleaned.startsWith('91') && cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  
  // If it doesn't start with +, add it
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }
  
  return cleaned;
};

export const formatWhatsAppMessage = (
  type: 'appointment' | 'contact', 
  data: any,
  recipientType: 'admin' | 'user'
): string => {
  // Get message type if it exists
  const messageType = data.messageType || 'default';
  
  if (recipientType === 'admin') {
    // Admin notifications
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
  } else {
    // User notifications
    if (type === 'appointment') {
      // Handle different message types for appointments
      switch(messageType) {
        case 'reminder':
          return `🔔 Appointment Reminder - Dr. Basavaiah Ayurveda Hospital

Dear ${data.name},

This is a friendly reminder of your upcoming appointment:
${data.preferredDate ? `Date: ${data.preferredDate}` : ''}
${data.preferredTime ? `Time: ${data.preferredTime}` : ''}

Please arrive 15 minutes before your appointment time. 
If you need to reschedule, please call us at +916281508325.

Warm regards,
Dr. Basavaiah Ayurveda Hospital`;

        case 'confirmation':
          return `✅ Appointment Confirmed - Dr. Basavaiah Ayurveda Hospital

Dear ${data.name},

We're pleased to confirm your appointment has been scheduled:
${data.preferredDate ? `Date: ${data.preferredDate}` : ''}
${data.preferredTime ? `Time: ${data.preferredTime}` : ''}

We look forward to seeing you. If you have any questions before your visit, 
please call us at +916281508325.

Wishing you wellness,
Dr. Basavaiah Ayurveda Hospital`;

        case 'cancellation':
          return `❌ Appointment Cancelled - Dr. Basavaiah Ayurveda Hospital

Dear ${data.name},

Your appointment scheduled for:
${data.preferredDate ? `Date: ${data.preferredDate}` : ''}
${data.preferredTime ? `Time: ${data.preferredTime}` : ''}

Has been cancelled as requested. If you would like to reschedule,
please call us at +916281508325 or book online.

Thank you,
Dr. Basavaiah Ayurveda Hospital`;

        default:
          return `🙏 Thank you for booking an appointment at Dr. Basavaiah Ayurveda Hospital!

Dear ${data.name},

We have received your appointment request with the following details:

${data.preferredDate ? `Date: ${data.preferredDate}` : ''}
${data.preferredTime ? `Time: ${data.preferredTime}` : ''}

Our staff will contact you shortly to confirm your appointment. If you have any urgent questions, please call us at +916281508325.

Wishing you wellness,
Dr. Basavaiah Ayurveda Hospital`;
      }
    } else {
      return `🙏 Thank you for contacting Dr. Basavaiah Ayurveda Hospital!

Dear ${data.name},

We have received your message and appreciate your interest in our Ayurvedic treatments. Our team will review your inquiry and get back to you within 24 hours.

If you have any urgent concerns, please call us at +916281508325.

Wishing you wellness,
Dr. Basavaiah Ayurveda Hospital`;
    }
  }
};