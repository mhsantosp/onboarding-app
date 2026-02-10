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
  errors: {
    documentType?: string;
    documentNumber?: string;
    fullName?: string;
    email?: string;
  } = {};
  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const documentType = (form.querySelector('#documentType') as HTMLSelectElement)?.value;
    const documentNumber = (form.querySelector('#documentNumber') as HTMLInputElement)?.value.trim();
    const fullName = (form.querySelector('#fullName') as HTMLInputElement)?.value.trim();
    const email = (form.querySelector('#email') as HTMLInputElement)?.value.trim();
    // Reset errores
    this.errors = {};
    // Validaciones básicas
    if (!documentType) {
      this.errors.documentType = 'El tipo de documento es obligatorio.';
    }
    if (!documentNumber) {
      this.errors.documentNumber = 'El número de documento es obligatorio.';
    }
    if (!fullName) {
      this.errors.fullName = 'El nombre completo es obligatorio.';
    }
    if (!email) {
      this.errors.email = 'El email es obligatorio.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      this.errors.email = 'El email no tiene un formato válido.';
    }
    // Si hay errores, no emitimos el cliente
    if (Object.keys(this.errors).length > 0) {
      return;
    }
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
