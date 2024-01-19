import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
// import {  Ng2SearchPipeModule } from 'ng2-search-filter';
// import { Ng2OrderModule } from 'ng2-order-pipe';
// import { NgxPaginationModule } from 'ngx-pagination'; 

export const appConfig: ApplicationConfig = {

  
  providers: 
  [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"importtool-5edda","appId":"1:1010310820082:web:fc6f8f60a00ad6a7e8e06b","storageBucket":"importtool-5edda.appspot.com","apiKey":"AIzaSyDg4KO4AsDpMfULm7N0KXjdzWeLdhfzGUY","authDomain":"importtool-5edda.firebaseapp.com","messagingSenderId":"1010310820082","measurementId":"G-45JJQ5N5Q1"}))), importProvidersFrom(provideAuth(() => getAuth()))
  ],
};
