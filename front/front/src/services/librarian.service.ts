import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Librarian } from '../models/librarian.model';

@Injectable({
  providedIn: 'root',
})
export class LibrarianService {
  private apiUrl = 'http://localhost:3000/librarians';

  constructor(private http: HttpClient) {}

  getLibrarians(): Observable<Librarian[]> {
    return this.http.get<Librarian[]>(this.apiUrl);
  }

  getLibrarian(id: number): Observable<Librarian> {
    return this.http.get<Librarian>(`${this.apiUrl}/${id}`);
  }

  createLibrarian(librarian: Partial<Librarian>): Observable<Librarian> {
    return this.http.post<Librarian>(this.apiUrl, librarian);
  }

  updateLibrarian(id: number, librarian: Partial<Librarian>): Observable<Librarian> {
    return this.http.patch<Librarian>(`${this.apiUrl}/${id}`, librarian);
  }

  deleteLibrarian(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}