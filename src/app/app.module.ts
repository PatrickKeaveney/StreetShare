import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Router } from '@angular/router';
import { IonicModule, IonicRouteStrategy, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import firebaseConfig from '../app/shared/firebase-config';
import { AngularFirestore, FirestoreSettingsToken } from '@angular/fire/firestore';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { PopoverPage } from '../app/shared/popover';
import * as firebase from 'firebase/app';
 
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent,
                 PopoverPage,
                ],
  entryComponents: [PopoverPage],
  imports: [BrowserModule, 
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFireDatabase,
            AngularFireAuthModule,
            IonicModule.forRoot(), 
            AppRoutingModule],
  providers: [
            Geolocation,
            AuthService,
            UserService,
            NavController,
            StatusBar,
            SplashScreen,
            AngularFirestore,
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
            { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
