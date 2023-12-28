import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
// import {  Ng2SearchPipeModule } from 'ng2-search-filter';
// import { Ng2OrderModule } from 'ng2-order-pipe';
// import { NgxPaginationModule } from 'ngx-pagination'; 

export const appConfig: ApplicationConfig = {

  
  providers: 
  [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient()
  ],
};
