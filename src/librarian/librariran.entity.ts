import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

export enum AccessLevel {
  JUNIOR = 'junior',
  MEDIOR = 'medior',
  SENIOR = 'senior',
  ADMIN = 'admin',
}

@Entity()
export class Librarian {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  datumZaposlenja: Date;

  @Column({
    type: 'enum',
    enum: AccessLevel,
    default: AccessLevel.JUNIOR,
  })
  nivoPristupa: AccessLevel;
}
