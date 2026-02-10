import { Component } from '@angular/core';
import { CustomerForm } from '../../components/customer-form/customer-form';
import { CustomerList } from '../../components/customer-list/customer-list';
import { AccountSection } from '../../components/account-section/account-section';

@Component({
  selector: 'app-dashboard',
  imports: [CustomerForm, CustomerList, AccountSection],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  customers: {
    documentType: string;
    documentNumber: string;
    fullName: string;
    email: string;
  }[] = [];
  onCustomerCreated(customer: {
    documentType: string;
    documentNumber: string;
    fullName: string;
    email: string;
  }): void {
    this.customers = [...this.customers, customer];
  }
}
