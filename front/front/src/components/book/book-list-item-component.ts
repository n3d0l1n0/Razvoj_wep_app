import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: '[app-book-list-item]', 
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-list-item-component.html',
  styleUrls: ['./book-list-item-component.css'],
})
export class BookListItemComponent {
  @Input() book!: Book;
  @Input() showActions: boolean = false;
  @Output() bookDeleted = new EventEmitter<number>();

  onDeleteClick(): void {
    this.bookDeleted.emit(this.book.id);
  }
}