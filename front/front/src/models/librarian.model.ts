export interface User {
  id: number;
  ime: string;
  prezime: string;
  email: string;
  datumRodjenja: Date;
}

export enum AccessLevel {
  JUNIOR = 'junior',
  MEDIOR = 'medior',
  SENIOR = 'senior',
  ADMIN = 'admin',
}

export interface Librarian {
  id: number;
  user: User; 
  datumZaposlenja: Date;
  nivoPristupa: AccessLevel;
}