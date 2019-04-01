import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SimonComPage } from './simon-com.page';
import { PopoverController } from '@ionic/angular';
import {EventsMock, PopoverControllerMock} from 'ionic-mocks';

describe('SimonComPage', () => {
  let component: SimonComPage;
  let fixture: ComponentFixture<SimonComPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimonComPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        InAppBrowser,
        { provide: PopoverController, useFactory: () => PopoverControllerMock.instance() },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimonComPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
