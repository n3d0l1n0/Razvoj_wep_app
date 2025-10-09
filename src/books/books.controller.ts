import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Post()
  create(@Body() bookData: { naslov: string; autor: string }) {
    return this.booksService.create(bookData);
  }
}
