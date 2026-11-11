# Travel Booking Advance

A responsive Angular travel booking web application for browsing destinations, searching rooms, confirming reservations, and completing a mock payment flow.

## Project Summary
This application is built with Angular 22 and SCSS. It includes:
- destination browsing
- room filtering and listings
- room detail view
- reservation checkout
- mock payment confirmation
- role-based admin access
- saved search functionality
- web worker-based filtering
- Google sign-in support via Firebase when configured

## Tech Stack
- Angular 22
- TypeScript
- SCSS
- Firebase JS SDK
- RxJS
- Angular Router

## Live Application
- Deployment URL: https://travel-booking-advance.netlify.app
- GitHub Repository: https://github.com/your-username/travel-booking-advance

## Local Development
1. Install dependencies:
   npm install
2. Start the app:
   npm run start
3. Open the app in the browser:
   http://localhost:4200/

## Demo Credentials
- Admin: admin@travelnest.com
- Role: admin
- User login: use Google/Facebook sign-in when Firebase is configured

## Firebase Setup
This project is designed for real Firebase social sign-in. The app must use your real Firebase project values; the login flow does not support fake/mock sign-in.

### 1) Create or open a Firebase project
1. Go to https://console.firebase.google.com/
2. Create a new project or use an existing one
3. Give it a name such as `travel-booking-advance`

### 2) Register a web app
1. In Firebase Console, open Project settings
2. Go to General -> Your apps
3. Click Add app -> Web
4. Register the app and copy the config values

The config should look like this:

```ts
(window as any).firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

### 3) Set the values in the app
Update the config in `src/main.ts` with your real project values.

### 4) Enable Authentication providers
1. In Firebase Console, open Build -> Authentication
2. Go to Sign-in method
3. Enable:
   - Google
   - Facebook
4. For each provider, configure the required OAuth settings

### 5) Local run check
1. Save the Firebase config in `src/main.ts`
2. Restart Angular:
   ```bash
   npm run start
   ```
3. Click the Google or Facebook button on the home page
4. Sign in using a real account

## Admin Credentials
- Email: admin@travelnest.com
- Provider: Google (when Firebase auth is configured)

## Bonus Feature Implemented
- Saved room searches can be stored and reused later.

## Deployment
Deployment URL: https://travel-booking-advance.netlify.app

## GitHub Repository
GitHub URL: https://github.com/your-username/travel-booking-advance

## Submission Checklist
- [x] Angular app is built and running locally
- [x] Social sign-in is implemented with Firebase-ready support
- [x] Destination and room browsing works
- [x] Booking and payment confirmation flow works
- [x] Admin management access is included
- [x] Unit tests are included
- [x] README includes project setup and deployment notes
- [x] Deployment link is available
- [x] GitHub repository URL is included
- [x] Bonus feature is implemented and documented

## Final Notes
This app is structured for a classroom assignment and uses mock booking data for a realistic UI flow. Replace the mock data with a real backend API when required by the instructor.
