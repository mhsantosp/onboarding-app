import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  imports: [],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class CustomerList {
  @Input() customers: {
    documentType: string;
    documentNumber: string;
    fullName: string;
    email: string;
  }[] = [];
}
