import { IsEnum, IsNumber } from 'class-validator';
import { AccessLevel } from '../librariran.entity';

export class CreateLibrarianDto {
  @IsNumber()
  userId: number;

  @IsEnum(AccessLevel)
  nivoPristupa: AccessLevel;
}
