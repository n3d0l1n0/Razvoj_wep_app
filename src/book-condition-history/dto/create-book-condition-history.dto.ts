import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BookCondition } from 'src/books/book.enums';

export class CreateBookConditionHistoryDto {
  @IsNumber()
  bookId: number;

  @IsNumber()
  librarianId: number;

  @IsEnum(BookCondition)
  prethodnoStanje: BookCondition;

  @IsEnum(BookCondition)
  novoStanje: BookCondition;

  @IsString()
  @IsOptional()
  komentar?: string;
}
