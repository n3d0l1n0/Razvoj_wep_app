import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Loan } from '../loan/loan.entity';
import { Reservation } from '../reservation/reservation.entity';
import { BookConditionHistory } from '../book-condition-history/book-condition-history.entity';

export enum BookStatus {
  DOSTUPNA = 'dostupna',
  ZADUZENA = 'zaduzena',
}

export enum BookCondition {
  NEOSTECENA = 'neostecena',
  VRLO_MALO_STETE = 'vrlo_malo_stete',
  OSTECENA = 'ostecena',
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  naslov: string;

  @Column()
  autor: string;

  @Column({ unique: true })
  isbn: string;

  @Column({
    type: 'enum',
    enum: BookStatus,
    default: BookStatus.DOSTUPNA,
  })
  status: BookStatus;

  @Column({
    type: 'enum',
    enum: BookCondition,
    default: BookCondition.NEOSTECENA,
  })
  stanje: BookCondition;

  @OneToMany(() => Loan, (loan: Loan) => loan.book)
  loans: Loan[];

  @OneToMany(() => Reservation, (reservation) => reservation.book)
  reservations: Reservation[];

  @OneToMany(() => BookConditionHistory, (history) => history.book)
  conditionHistory: BookConditionHistory[];
}
