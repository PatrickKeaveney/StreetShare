import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimonComPage } from './simon-com.page';

describe('SimonComPage', () => {
  let component: SimonComPage;
  let fixture: ComponentFixture<SimonComPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimonComPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
