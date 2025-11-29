import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDetailsDialog } from '../customer-details-dialog/customer-details-dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  imports: [CommonModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {
private modelService = inject(NgbModal);

openModel(){
  this.modelService.open(CustomerDetailsDialog);
}
}
