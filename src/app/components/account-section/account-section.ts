import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-section',
  imports: [FormsModule],
  templateUrl: './account-section.html',
  styleUrl: './account-section.css',
})
export class AccountSection {
  @Input() customers: {
    documentType: string;
    documentNumber: string;
    fullName: string;
    email: string;
  }[] = [];

  selectedDocumentNumber: string | null = null;

  // diferenciamos mensaje y tipo (error / success)
  message: string | null = null;
  messageType: 'error' | 'success' | null = null;

  onCreateAccount(): void {
    // limpiamos el mensaje anterior
    this.message = null;
    this.messageType = null;

    if (!this.selectedDocumentNumber) {
      this.message = 'Selecciona un cliente primero.';
      this.messageType = 'error';
      return;
    }

    const customer = this.customers.find(
      (c) => c.documentNumber === this.selectedDocumentNumber,
    );

    if (!customer) {
      this.message = 'Cliente no encontrado.';
      this.messageType = 'error';
      return;
    }

    // Aquí luego llamaremos al backend; por ahora solo log:
    console.log('Crear cuenta para:', customer);

    this.message = `Cuenta creada (simulada) para ${customer.fullName}`;
    this.messageType = 'success';
  }
}
