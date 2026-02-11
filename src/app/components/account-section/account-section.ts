import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account/account.service';
import { Customer } from '../../services/customer/customer.service';

@Component({
  selector: 'app-account-section',
  imports: [FormsModule],
  templateUrl: './account-section.html',
  styleUrl: './account-section.css',
})
export class AccountSection {
  @Input() customers: Customer[] = [];

  selectedDocumentNumber: string | null = null;

  // diferenciamos mensaje y tipo (error / success)
  message: string | null = null;
  messageType: 'error' | 'success' | null = null;

  constructor(
    private readonly accountService: AccountService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

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

    // Llamamos al backend para crear la cuenta real
    this.accountService.createAccount(Number(customer.id)).subscribe({
      next: (account) => {
        this.message = `Cuenta creada para ${customer.fullName} con número ${account.accountNumber}`;
        this.messageType = 'success';
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error creando cuenta', error);

        const backendMessage: string | undefined = error?.error?.message;

        if (error.status === 400) {
          this.message = backendMessage ?? 'Solicitud inválida al crear la cuenta.';
        } else if (error.status === 404) {
          this.message = backendMessage ?? 'Cliente no encontrado en el backend.';
        } else {
          this.message = 'Ocurrió un error inesperado al crear la cuenta.';
        }

        this.messageType = 'error';
        this.cdr.detectChanges();
      },
    });
  }
}
