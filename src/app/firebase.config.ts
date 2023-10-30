import { EnvironmentProviders, importProvidersFrom } from "@angular/core";

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment.development';
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore())
])

export { firebaseProviders };
