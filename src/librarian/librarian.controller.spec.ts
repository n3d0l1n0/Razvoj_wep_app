import { Test, TestingModule } from '@nestjs/testing';
import { LibrarianController } from './librarian.controller';

describe('LibrarianController', () => {
  let controller: LibrarianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibrarianController],
    }).compile();

    controller = module.get<LibrarianController>(LibrarianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
