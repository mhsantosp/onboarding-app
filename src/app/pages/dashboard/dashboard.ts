import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomerForm } from '../../components/customer-form/customer-form';
import { CustomerList } from '../../components/customer-list/customer-list';
import { AccountSection } from '../../components/account-section/account-section';
import { CustomerService, Customer } from '../../services/customer/customer.service';

@Component({
  selector: 'app-dashboard',
  imports: [CustomerForm, CustomerList, AccountSection],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  customers: Customer[] = [];

  constructor(
    private readonly customerService: CustomerService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  private loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
      },
      error: (error) => {
        console.error('Error cargando clientes', error);
      },
    });
  }

  onCustomerCreated(customer: Customer): void {
    this.customerService.createCustomer(customer).subscribe({
      next: (created) => {
        // Actualizamos el array local (inmutable)
        this.customers = [...this.customers, created];

        // Forzamos que Angular refresque todas las vistas que dependen de `customers`
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error creando cliente', error);
      },
    });
  }
}
