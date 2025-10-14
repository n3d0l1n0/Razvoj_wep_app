import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:3000/loans';

  constructor(private http: HttpClient) {}

  getLoansByUserId(userId: number): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/user/${userId}`);
  }

  createLoan(loanData: { userId: number, bookId: number, predvidjeniDatumVracanja: string }): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loanData);
  }

  deleteLoan(loanId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${loanId}`);
  }
}