import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricosPage } from './historicos.page';

describe('HistoricosPage', () => {
  let component: HistoricosPage;
  let fixture: ComponentFixture<HistoricosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
