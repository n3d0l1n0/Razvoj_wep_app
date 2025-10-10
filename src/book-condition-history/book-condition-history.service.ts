import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookConditionHistory } from './book-condition-history.entity';
import { CreateBookConditionHistoryDto } from './dto/create-book-condition-history.dto';
import { UpdateBookConditionHistoryDto } from './dto/update-book-condition-history.dto';

@Injectable()
export class BookConditionHistoryService {
  constructor(
    @InjectRepository(BookConditionHistory)
    private historyRepository: Repository<BookConditionHistory>,
  ) {}

  create(
    createDto: CreateBookConditionHistoryDto,
  ): Promise<BookConditionHistory> {
    const historyEntry = this.historyRepository.create(createDto);
    return this.historyRepository.save(historyEntry);
  }

  findAll(): Promise<BookConditionHistory[]> {
    return this.historyRepository.find({ relations: ['book', 'evidentirao'] });
  }

  async findOne(id: number): Promise<BookConditionHistory> {
    const historyEntry = await this.historyRepository.findOne({
      where: { id },
      relations: ['book', 'evidentirao'],
    });
    if (!historyEntry) {
      throw new NotFoundException(
        `Zapis o stanju sa ID-jem #${id} nije pronađen.`,
      );
    }
    return historyEntry;
  }

  async update(
    id: number,
    updateDto: UpdateBookConditionHistoryDto,
  ): Promise<BookConditionHistory> {
    const historyEntry = await this.historyRepository.preload({
      id: id,
      ...updateDto,
    });
    if (!historyEntry) {
      throw new NotFoundException(
        `Zapis o stanju sa ID-jem #${id} nije pronađen.`,
      );
    }
    return this.historyRepository.save(historyEntry);
  }

  async remove(id: number): Promise<BookConditionHistory> {
    const historyToRemove = await this.findOne(id);
    return this.historyRepository.remove(historyToRemove);
  }
}
