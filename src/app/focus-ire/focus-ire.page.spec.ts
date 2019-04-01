import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FocusIrePage } from './focus-ire.page';
import { PopoverController } from '@ionic/angular';
import {EventsMock, PopoverControllerMock} from 'ionic-mocks';

describe('FocusIrePage', () => {
   let component: FocusIrePage;
  let fixture: ComponentFixture<FocusIrePage>;

 beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusIrePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        InAppBrowser,
        { provide: PopoverController, useFactory: () => PopoverControllerMock.instance() },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusIrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
