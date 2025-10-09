import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException(`Knjiga sa ID-jem #${id} nije pronađena.`);
    }

    return book;
  }

  create(book: Partial<Book>): Promise<Book> {
    const novaKnjiga = this.booksRepository.create(book);
    return this.booksRepository.save(novaKnjiga);
  }
}
