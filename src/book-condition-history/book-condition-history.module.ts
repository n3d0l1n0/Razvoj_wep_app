import { Module } from '@nestjs/common';
import { BookConditionHistoryService } from './book-condition-history.service';
import { BookConditionHistoryController } from './book-condition-history.controller';

@Module({
  providers: [BookConditionHistoryService],
  controllers: [BookConditionHistoryController]
})
export class BookConditionHistoryModule {}
