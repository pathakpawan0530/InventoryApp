import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsDialog } from './customer-details-dialog';

describe('CustomerDetailsDialog', () => {
  let component: CustomerDetailsDialog;
  let fixture: ComponentFixture<CustomerDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
