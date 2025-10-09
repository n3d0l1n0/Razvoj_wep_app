import { Test, TestingModule } from '@nestjs/testing';
import { BookConditionHistoryController } from './book-condition-history.controller';

describe('BookConditionHistoryController', () => {
  let controller: BookConditionHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookConditionHistoryController],
    }).compile();

    controller = module.get<BookConditionHistoryController>(BookConditionHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
