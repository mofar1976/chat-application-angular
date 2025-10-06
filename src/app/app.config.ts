import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { firebaseConfig } from './firebase/firebase-config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideToastr } from 'ngx-toastr';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { provideAppStore } from './store';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';

const httpLoaderFactory = (http: HttpClient) => {
  return {
    getTranslation: (lang: string) => http.get(`./assets/i18n/${lang}.json`),
  } as any;
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideToastr(),
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {},
      },
    }),
    provideHttpClient(),
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: { prefix: './assets/i18n/', suffix: '.json' },
    },
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    ...provideAppStore(),
  ],
};
