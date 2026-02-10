import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-customer-form',
  imports: [],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
})
export class CustomerForm {
  @Output() customerCreated = new EventEmitter<{
    documentType: string;
    documentNumber: string;
    fullName: string;
    email: string;
  }>();
  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const documentType = (form.querySelector('#documentType') as HTMLSelectElement)?.value;
    const documentNumber = (form.querySelector('#documentNumber') as HTMLInputElement)?.value;
    const fullName = (form.querySelector('#fullName') as HTMLInputElement)?.value;
    const email = (form.querySelector('#email') as HTMLInputElement)?.value;
    const customer = {
      documentType,
      documentNumber,
      fullName,
      email,
    };
    console.log('Customer form values:', customer);
    this.customerCreated.emit(customer);
    form.reset();
  }
}
