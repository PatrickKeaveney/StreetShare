import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { LoginPage } from './login.page';
import { AuthService } from '../shared/auth.service';
import {EventsMock, AlertControllerMock } from 'ionic-mocks';
import { Router } from '@angular/router';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let classUnderTest: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        AuthService,
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
