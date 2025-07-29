import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core'; // Import necessary Angular modules
import { provideRouter } from '@angular/router'; // Import router for navigation
import { provideHttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { routes } from './app.routes'; // Import application routes


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

  ]
};
