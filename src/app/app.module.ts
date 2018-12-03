import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { XModule, XModules } from './+x';

import { AppRoutedComponents, AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.guard';

@NgModule({
	declarations: [
		AppComponent,
		...AppRoutedComponents
	],
	imports: [
		BrowserModule.withServerTransition({appId: 'ukm'}),
		AngularFirestoreModule.enablePersistence(),
		NoopAnimationsModule,
		XModule,
		...XModules,
		AppRoutingModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
	],
	providers: [AuthGuard, AuthService],
	bootstrap: [AppComponent]
})
export class AppModule { }
