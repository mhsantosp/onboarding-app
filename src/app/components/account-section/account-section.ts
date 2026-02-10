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
  lastCreatedAccountMessage: string | null = null;
  onCreateAccount(): void {
    if (!this.selectedDocumentNumber) {
      this.lastCreatedAccountMessage = 'Selecciona un cliente primero.';
      return;
    }
    const customer = this.customers.find(
      (c) => c.documentNumber === this.selectedDocumentNumber,
    );
    if (!customer) {
      this.lastCreatedAccountMessage = 'Cliente no encontrado.';
      return;
    }
    // Aquí luego llamaremos al backend; por ahora solo log:
    console.log('Crear cuenta para:', customer);
    this.lastCreatedAccountMessage = `Cuenta creada (simulada) para ${customer.fullName}`;
  }
}
