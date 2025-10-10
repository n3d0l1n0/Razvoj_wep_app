import { PartialType } from '@nestjs/mapped-types';
import { CreateBookConditionHistoryDto } from './create-book-condition-history.dto';

export class UpdateBookConditionHistoryDto extends PartialType(
  CreateBookConditionHistoryDto,
) {}
