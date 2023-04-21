import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

// Import the typeOrm

// Import the Firebase SDK
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Add your Firebase project configuration here
  projectId: 'absdata-46619',
  appId: '1:252976268944:web:499a9a76198c76ddce7a15',
  storageBucket: 'absdata-46619.appspot.com',
  apiKey: 'AIzaSyDvnnMp0ixuQbTg27nFqa8z_BgZQQXVLXk',
  authDomain: 'absdata-46619.firebaseapp.com',
  messagingSenderId: '252976268944',
};

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
  ],
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
