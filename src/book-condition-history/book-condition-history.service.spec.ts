import { Test, TestingModule } from '@nestjs/testing';
import { BookConditionHistoryService } from './book-condition-history.service';

describe('BookConditionHistoryService', () => {
  let service: BookConditionHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookConditionHistoryService],
    }).compile();

    service = module.get<BookConditionHistoryService>(BookConditionHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
