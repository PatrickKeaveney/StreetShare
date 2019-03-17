import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusIrePage } from './focus-ire.page';

describe('FocusIrePage', () => {
  let component: FocusIrePage;
  let fixture: ComponentFixture<FocusIrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusIrePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
