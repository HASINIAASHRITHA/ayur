# Ayurveda Hospital - Deployment Guide

## Firebase Setup & WhatsApp Integration

### 1. Firebase Configuration
Your Firebase config is already set up in `src/lib/firebase.ts`

### 2. Deploy Firebase Functions (WhatsApp)
```bash
cd firebase-functions
npm install
firebase deploy --only functions
```

### 3. Configure Twilio WhatsApp
```bash
firebase functions:config:set twilio.account_sid="YOUR_TWILIO_SID"
firebase functions:config:set twilio.auth_token="YOUR_TWILIO_TOKEN" 
firebase functions:config:set twilio.phone_number="YOUR_TWILIO_WHATSAPP_NUMBER"
```

### 4. Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### 5. Create Admin User
```bash
firebase auth:import users.json
```

## Features Implemented:
✅ Real-time appointments dashboard
✅ WhatsApp notifications (+91 6281508325)
✅ Firebase Auth admin login
✅ Cloudinary image uploads
✅ Firestore security rules
✅ Appointment booking modal
✅ Status management (Pending/Confirmed/Canceled)

All backend functionality preserved with exact UI/UX design implementation.

## Deployment Instructions

This project was created by HAsini Addanki from Dream Team Services.

## About
This Ayurveda Hospital CMS was developed by HAsini Addanki from Dream Team Services, providing a complete healthcare management solution with modern web technologies.