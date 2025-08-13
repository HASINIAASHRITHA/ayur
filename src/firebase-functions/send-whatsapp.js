// Firebase Function for WhatsApp notifications
// Deploy this to Firebase Functions

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

// WhatsApp API configuration
const DEFAULT_ADMIN_PHONE = '+916281508325';
const TWILIO_ACCOUNT_SID = functions.config().twilio?.account_sid; // Set via Firebase config
const TWILIO_AUTH_TOKEN = functions.config().twilio?.auth_token;   // Set via Firebase config
const TWILIO_PHONE = functions.config().twilio?.phone_number;      // Your Twilio WhatsApp number

exports.sendWhatsAppMessage = functions.https.onCall(async (data, context) => {
  try {
    const { type, recipientType, phoneNumber, appointmentData, contactData } = data;
    const messageData = type === 'appointment' ? appointmentData : contactData;
    
    if (!messageData) {
      throw new Error('No data provided for message');
    }
    
    // Format the message based on recipient and type
    let message = formatMessage(type, messageData, recipientType);
    
    // Initialize Twilio client if credentials are available
    if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE) {
      const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
      
      // Send WhatsApp message
      const result = await client.messages.create({
        body: message,
        from: `whatsapp:${TWILIO_PHONE}`,
        to: `whatsapp:${phoneNumber}`
      });
      
      // Log notification to Firestore
      await admin.firestore().collection('notifications').add({
        type: 'whatsapp',
        status: 'sent',
        recipientType,
        recipient: phoneNumber,
        message: message,
        messageData,
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
        twilioSid: result.sid
      });
      
      return { 
        success: true, 
        message: `WhatsApp notification sent to ${recipientType}`,
        recipient: phoneNumber 
      };
    } else {
      console.log('Twilio credentials not configured. Running in demo mode.');
      console.log(`Would send to ${phoneNumber}: ${message}`);
      
      // Log demo notification
      await admin.firestore().collection('notifications').add({
        type: 'whatsapp',
        status: 'demo',
        recipientType,
        recipient: phoneNumber,
        message: message,
        messageData,
        sentAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return { 
        success: true, 
        demo: true,
        message: `Demo WhatsApp notification logged for ${recipientType}`,
        recipient: phoneNumber 
      };
    }
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    
    // Log failed notification
    await admin.firestore().collection('notifications').add({
      type: 'whatsapp',
      status: 'failed',
      error: error.message,
      data,
      failedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    throw new functions.https.HttpsError(
      'internal',
      'Failed to send WhatsApp notification',
      error.message
    );
  }
});

function formatMessage(type, data, recipientType) {
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
      return `🙏 Thank you for booking an appointment at Dr. Basavaiah Ayurveda Hospital!

Dear ${data.name},

We have received your appointment request with the following details:

${data.preferredDate ? `Date: ${data.preferredDate}` : ''}
${data.preferredTime ? `Time: ${data.preferredTime}` : ''}

Our staff will contact you shortly to confirm your appointment. If you have any urgent questions, please call us at +916281508325.

Wishing you wellness,
Dr. Basavaiah Ayurveda Hospital`;
    } else {
      return `🙏 Thank you for contacting Dr. Basavaiah Ayurveda Hospital!

Dear ${data.name},

We have received your message and appreciate your interest in our Ayurvedic treatments. Our team will review your inquiry and get back to you within 24 hours.

If you have any urgent concerns, please call us at +916281508325.

Wishing you wellness,
Dr. Basavaiah Ayurveda Hospital`;
    }
  }
}

// Alternative trigger: Auto-send on new appointment
exports.onNewAppointment = functions.firestore
  .document('appointments/{appointmentId}')
  .onCreate(async (snap, context) => {
    const appointmentData = snap.data();
    const appointmentId = context.params.appointmentId;
    
    try {
      // Send to admin
      await sendNotification(
        'appointment',
        'admin',
        DEFAULT_ADMIN_PHONE,
        appointmentData,
        appointmentId
      );
      
      // Send to user if phone is available
      if (appointmentData.phone) {
        const userPhone = formatPhoneNumber(appointmentData.phone);
        await sendNotification(
          'appointment',
          'user',
          userPhone,
          appointmentData,
          appointmentId
        );
      }
    } catch (error) {
      console.error('Failed to send WhatsApp notification:', error);
    }
  });

// Alternative trigger: Auto-send on new contact message
exports.onNewContact = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snap, context) => {
    const contactData = snap.data();
    const contactId = context.params.contactId;
    
    try {
      // Send to admin
      await sendNotification(
        'contact',
        'admin',
        DEFAULT_ADMIN_PHONE,
        contactData,
        contactId
      );
      
      // Send to user if phone is available
      if (contactData.phone) {
        const userPhone = formatPhoneNumber(contactData.phone);
        await sendNotification(
          'contact',
          'user',
          userPhone,
          contactData,
          contactId
        );
      }
    } catch (error) {
      console.error('Failed to send WhatsApp notification:', error);
    }
  });

async function sendNotification(type, recipientType, phoneNumber, data, docId) {
  const message = formatMessage(type, data, recipientType);
  
  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE) {
    const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    
    const result = await client.messages.create({
      body: message,
      from: `whatsapp:${TWILIO_PHONE}`,
      to: `whatsapp:${phoneNumber}`
    });
    
    console.log(`WhatsApp message sent to ${phoneNumber}, SID: ${result.sid}`);
    return result.sid;
  } else {
    console.log(`Demo mode: Would send to ${phoneNumber}: ${message}`);
    return 'demo-mode';
  }
}

function formatPhoneNumber(phone) {
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
}