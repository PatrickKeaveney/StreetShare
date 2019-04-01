import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location, LocationStrategy } from '@angular/common';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { QRPage } from './QR.page';
import { RouterTestingModule } from '@angular/router/testing';
//import { PlatformMock, StatusBarMock, SplashScreenMock } from '../shared/mocks-ionic';

describe('QRPage', () => {
  let component: QRPage;
  let fixture: ComponentFixture<QRPage>;
  let PathLocationStrategy

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QRPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        QRScanner,
        Location,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
