import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticoPage } from './automatico.page';

describe('AutomaticoPage', () => {
  let component: AutomaticoPage;
  let fixture: ComponentFixture<AutomaticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomaticoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
