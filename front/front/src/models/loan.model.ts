import { User } from './user.model';
import { Book } from './book.model';

export enum LoanStatus {
  NA_CEKANJU = 'na_cekanju',
  ODOBRENO = 'odobreno',
  ODBIJENO = 'odbijeno',
  VRACENO = 'vraceno',
  KASNI = 'kasni',
}

export interface Loan {
  id: number;
  datumZaduzenja: Date;
  predvidjeniDatumVracanja: Date;
  stvarniDatumVracanja: Date | null;
  status: LoanStatus;
  user: User;
  book: Book;
}