import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book, BookCondition } from '../books/book.entity';
import { Librarian } from '../librarian/librariran.entity';

@Entity()
export class BookConditionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.conditionHistory)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => Librarian, { nullable: false })
  @JoinColumn({ name: 'librarianId' })
  evidentirao: Librarian;

  @Column({ type: 'enum', enum: BookCondition })
  prethodnoStanje: BookCondition;

  @Column({ type: 'enum', enum: BookCondition })
  novoStanje: BookCondition;

  @Column({ type: 'text', nullable: true })
  komentar: string;

  @CreateDateColumn()
  datumPromene: Date;
}
