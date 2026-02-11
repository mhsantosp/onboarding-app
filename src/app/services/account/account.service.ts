import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Account {
  id?: number;
  customerId: number;
  accountNumber?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly baseUrl = 'http://localhost:8080/api/accounts';

  constructor(private readonly http: HttpClient) {}

  createAccount(customerId: number): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, { customerId });
  }

  getAccountsByCustomer(customerId?: number): Observable<Account[]> {
    if (customerId == null) {
      return this.http.get<Account[]>(this.baseUrl);
    }

    return this.http.get<Account[]>(`${this.baseUrl}?customerId=${customerId}`);
  }
}
