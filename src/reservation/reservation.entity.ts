import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Book } from '../books/book.entity';

export enum ReservationStatus {
  AKTIVNA = 'aktivna',
  OTKAZANA = 'otkazana',
  REALIZOVANA = 'realizovana',
}

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  datumRezervacije: Date;

  @Column({ type: 'date' })
  isticeDatuma: Date;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.AKTIVNA,
  })
  status: ReservationStatus;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.reservations)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
