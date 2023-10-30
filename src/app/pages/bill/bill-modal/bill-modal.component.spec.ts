import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillModalComponent } from './bill-modal.component';

describe('BillModalComponent', () => {
  let component: BillModalComponent;
  let fixture: ComponentFixture<BillModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BillModalComponent]
    });
    fixture = TestBed.createComponent(BillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
