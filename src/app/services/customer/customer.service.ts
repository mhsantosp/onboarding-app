import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer {
  id?: number;
  documentType: string;
  documentNumber: string;
  fullName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly baseUrl = 'http://localhost:8080/api/customers';

  constructor(private readonly http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer);
  }
}
