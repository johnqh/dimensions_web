/**
 * @fileoverview Consolidated app initialization
 * @description Single entry point for all DI singletons and service initializations
 */

import {
  initializeStorageService,
  initializeNetworkService,
  initializeFirebaseService,
} from '@sudobility/di';
import { initializeInfoService, registerServiceWorker } from '@sudobility/di_web';
import { initWebVitals } from '../utils/webVitals';

/**
 * Initialize all app services and singletons.
 * Must be called before rendering the React app.
 *
 * Initialization order:
 * 1. Storage service
 * 2. Firebase DI service (analytics)
 * 3. Network service
 * 4. Info service
 * 5. i18n (imported separately)
 * 6. Performance monitoring (service worker, web vitals)
 */
export function initializeApp(): void {
  // 1. Initialize storage service
  initializeStorageService();

  // 2. Initialize Firebase DI service (analytics)
  initializeFirebaseService({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  });

  // 3. Initialize network service
  initializeNetworkService();

  // 4. Initialize info service
  initializeInfoService();

  // 5. i18n is initialized via import in main.tsx

  // 6. Initialize performance monitoring
  registerServiceWorker();
  initWebVitals();
}
