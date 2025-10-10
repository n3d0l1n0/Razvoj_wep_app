import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { LoanStatus } from '../loan.entity';

export class CreateLoanDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  bookId: number;

  @IsDateString()
  predvidjeniDatumVracanja: Date;

  @IsEnum(LoanStatus)
  @IsOptional()
  status?: LoanStatus;
}
