import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Firebase configuration is read from the browser window so it can be replaced
// without rebuilding the Angular app.
// Replace each value with the actual values from your Firebase project:
// Firebase Console -> Project settings -> Your apps -> Web app -> SDK setup and configuration
const firebaseConfig = {
  apiKey: 'PASTE_YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef1234567890',
};

const hasPlaceholderValue = Object.values(firebaseConfig).some((value) =>
  typeof value === 'string' && value.toLowerCase().includes('paste_') || value.toLowerCase().includes('your_')
);

(window as any).firebaseConfig = firebaseConfig;

if (hasPlaceholderValue) {
  console.warn(
    'Firebase is not fully configured yet. Replace the placeholder values in src/main.ts with your real Firebase project config before testing Google/Facebook sign-in.',
  );
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
