import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {AUTH_REPOSITORY} from './core/tokens/auth-repository.token';
import AuthRestRepositoryAdapter from './core/adapters/auth-rest-repository-adapter';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {provide: AUTH_REPOSITORY, useClass: AuthRestRepositoryAdapter},
    provideHttpClient()
  ]
};
