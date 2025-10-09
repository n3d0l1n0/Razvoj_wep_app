import { User } from '../user/user.entity';
import { Book } from '../books/book.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum LoanStatus {
  NA_CEKANJU = 'na_cekanju',
  ODOBRENO = 'odobreno',
  ODBIJENO = 'odbijeno',
  VRACENO = 'vraceno',
  KASNI = 'kasni',
}

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  datumZaduzenja: Date;

  @Column({ type: 'date' })
  predvidjeniDatumVracanja: Date;

  @Column({ type: 'date', nullable: true })
  stvarniDatumVracanja: Date | null;

  @Column({
    type: 'enum',
    enum: LoanStatus,
    default: LoanStatus.NA_CEKANJU,
  })
  status: LoanStatus;

  @ManyToOne(() => User, (user) => user.loans)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.loans)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
