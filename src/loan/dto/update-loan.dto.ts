import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanDto } from './create-loan.dto';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
  @IsDateString()
  @IsOptional()
  stvarniDatumVracanja?: Date;
}
