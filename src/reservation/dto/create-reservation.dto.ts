import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ReservationStatus } from '../reservation.entity';

export class CreateReservationDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  bookId: number;

  @IsDateString()
  isticeDatuma: Date;

  @IsEnum(ReservationStatus)
  @IsOptional()
  status?: ReservationStatus;
}
