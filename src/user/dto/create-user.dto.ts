/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsEnum,
  MinLength,
} from 'class-validator';
import { UserGender } from '../user.entity';
export class CreateUserDto {
  @IsString()
  ime: string;
  @IsString()
  prezime: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8, { message: 'Lozinka mora imati najmanje 8 karaktera.' })
  password: string;
  @IsString()
  @IsOptional()
  brojTelefona?: string;
  @IsDateString()
  datumRodjenja: Date;
  @IsEnum(UserGender)
  @IsOptional()
  pol?: UserGender;
}
