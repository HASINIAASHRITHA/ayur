// Firebase Function for WhatsApp notifications
// Deploy this to Firebase Functions

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

// WhatsApp API configuration
const WHATSAPP_PHONE = '+916281508325';
const TWILIO_ACCOUNT_SID = functions.config().twilio.account_sid; // Set via Firebase config
const TWILIO_AUTH_TOKEN = functions.config().twilio.auth_token;   // Set via Firebase config
const TWILIO_PHONE = functions.config().twilio.phone_number;      // Your Twilio WhatsApp number

exports.sendWhatsAppNotification = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { type, data } = req.body;
    
    let message = '';
    
    if (type === 'appointment') {
      message = `🏥 New Appointment Booking!

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Message: ${data.message || 'No message provided'}
${data.preferredDate ? `Preferred Date: ${data.preferredDate}` : ''}
${data.preferredTime ? `Preferred Time: ${data.preferredTime}` : ''}

Status: Pending
Time: ${new Date().toLocaleString('en-IN')}

Please respond to the patient promptly.`;
    } else if (type === 'contact') {
      message = `💬 New Contact Form Submission!

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Message: ${data.message}

Time: ${new Date().toLocaleString('en-IN')}`;
    }

    // Initialize Twilio client
    const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    
    // Send WhatsApp message
    await client.messages.create({
      body: message,
      from: `whatsapp:${TWILIO_PHONE}`,
      to: `whatsapp:${WHATSAPP_PHONE}`
    });

    // Log notification to Firestore
    await admin.firestore().collection('notifications').add({
      type: 'whatsapp',
      status: 'sent',
      recipient: WHATSAPP_PHONE,
      message: message,
      data: data,
      sentAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).json({ success: true, message: 'WhatsApp notification sent' });
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    
    // Log failed notification
    await admin.firestore().collection('notifications').add({
      type: 'whatsapp',
      status: 'failed',
      error: error.message,
      data: req.body,
      failedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(500).json({ 
      success: false, 
      error: 'Failed to send WhatsApp notification',
      details: error.message 
    });
  }
});

// Alternative trigger: Auto-send on new appointment
exports.onNewAppointment = functions.firestore
  .document('appointments/{appointmentId}')
  .onCreate(async (snap, context) => {
    const appointmentData = snap.data();
    
    try {
      // Call the WhatsApp function
      const message = `🏥 New Appointment Booking!

Name: ${appointmentData.name}
Phone: ${appointmentData.phone}
Email: ${appointmentData.email}
Message: ${appointmentData.message || 'No message provided'}

Status: ${appointmentData.status}
Time: ${new Date().toLocaleString('en-IN')}

Appointment ID: ${context.params.appointmentId}`;

      const client = require('twilio')(
        functions.config().twilio.account_sid,
        functions.config().twilio.auth_token
      );
      
      await client.messages.create({
        body: message,
        from: `whatsapp:${functions.config().twilio.phone_number}`,
        to: `whatsapp:${WHATSAPP_PHONE}`
      });

      console.log('WhatsApp notification sent for appointment:', context.params.appointmentId);
    } catch (error) {
      console.error('Failed to send WhatsApp notification:', error);
    }
  });