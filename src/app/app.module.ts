import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Router } from '@angular/router';
import { IonicModule, IonicRouteStrategy, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth'

import firebaseConfig from '../app/shared/firebase-config';
import * as firebase from 'firebase/app';
import { Firebase } from '@ionic-native/firebase/ngx';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FcmService } from './shared/fcm.service';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { PopoverPage } from '../app/shared/popover';

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent,
                 PopoverPage,
                ],
  entryComponents: [PopoverPage],
  imports: [BrowserModule, 
            AngularFirestoreModule,
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFireDatabaseModule,
            AngularFireAuthModule,
            IonicModule.forRoot(), 
            AppRoutingModule],
  providers: [
            QRScanner,
            FcmService,
            Geolocation,
            AuthService,
            UserService,
            NavController,
            StatusBar,
            Firebase,
            SplashScreen,
            AngularFirestore,
            PayPal,
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
            { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
