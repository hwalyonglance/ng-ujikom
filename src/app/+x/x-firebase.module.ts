import { AngularFireModule }         from 'angularfire2';
import { AngularFireAuthModule }     from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { firebaseConfig } from '../../environments/firebase';

export const FirebaseModule = [
	AngularFireModule.initializeApp(firebaseConfig),
	AngularFireAuthModule,
	AngularFireDatabaseModule,
	AngularFireStorageModule
];
