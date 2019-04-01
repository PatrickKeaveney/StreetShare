import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Platform, IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppComponent } from './app.component';
import { FcmService } from './shared/fcm.service';
import { UserService } from './shared/user.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestore, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { BehaviorSubject } from 'rxjs';
import { PlatformMock,  } from '../app/shared/mocks-ionic';//StatusBarMock, SplashScreenMock

describe('AppComponent', () => {
 /* let fixture;
  let component;

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy, angularFireDatabaseSpy;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
    angularFireDatabaseSpy = jasmine.createSpyObj('AngularFireDatabase', ['hide']);
    

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
      /*{ provide: FcmService, useValue: FcmServiceSpy },  
        { provide: AngularFireModule, useValue: AngularFireModuleSpy },
        { provide: AngularFireDatabaseModule, useValue: AngularFireDatabaseModuleSpy },
        { provide: AngularFirestore, useValue: AngularFirestoreSpy },
        { provide: Firebase, useValue: FirebaseSpy },
        { provide: UserService, useValue: UserServiceSpy },
        { provide: AngularFireDatabase, useValue: AngularFireDatabaseSpy },
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy }, 
      ],
    }).compileComponents();
  }));

 
  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });*/

});

// TODO: add more tests!
