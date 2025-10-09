import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Loan } from '../loan/loan.entity';
import { Reservation } from '../reservation/reservation.entity';

export enum UserGender {
  MUSKI = 'muski',
  ZENSKI = 'zenski',
  NEIZJASNJEN = 'neizjasnjen',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ime: string;

  @Column()
  prezime: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ nullable: true })
  brojTelefona: string;

  @Column({ type: 'date' })
  datumRodjenja: Date;

  @CreateDateColumn()
  datumUclanjenja: Date;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.NEIZJASNJEN,
  })
  pol: UserGender;

  @OneToMany(() => Loan, (loan: Loan) => loan.user)
  loans: Loan[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
