import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlesPage } from './controles.page';

describe('ControlesPage', () => {
  let component: ControlesPage;
  let fixture: ComponentFixture<ControlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
