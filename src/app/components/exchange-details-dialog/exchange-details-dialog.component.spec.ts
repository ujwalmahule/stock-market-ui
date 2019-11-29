import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeDetailsDialogComponent } from './exchange-details-dialog.component';

describe('ExchangeDetailsDialogComponent', () => {
  let component: ExchangeDetailsDialogComponent;
  let fixture: ComponentFixture<ExchangeDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
