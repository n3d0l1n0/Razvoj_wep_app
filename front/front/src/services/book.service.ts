import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getAvailableBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}`);
  }

  addBook(bookData: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, bookData);
  }

  deleteBook(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateBook(id: number, bookData: Partial<Book>): Observable<Book> {
    return this.http.patch<Book>(`${this.apiUrl}/${id}`, bookData);
  }
}