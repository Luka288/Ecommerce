import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { apiURL } from './shared';
import { JwtModule } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withFetch()), provideAnimationsAsync(), provideAnimationsAsync(),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem("access_token"),
          allowedDomains: [apiURL],
        },
      }),
    ),
  ]
};
