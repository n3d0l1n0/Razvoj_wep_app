import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BookConditionHistoryService } from './book-condition-history.service';
import { CreateBookConditionHistoryDto } from './dto/create-book-condition-history.dto';
import { UpdateBookConditionHistoryDto } from './dto/update-book-condition-history.dto';

@Controller('book-condition-history')
export class BookConditionHistoryController {
  constructor(private readonly historyService: BookConditionHistoryService) {}

  @Post()
  create(@Body() createDto: CreateBookConditionHistoryDto) {
    return this.historyService.create(createDto);
  }

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.historyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBookConditionHistoryDto,
  ) {
    return this.historyService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.historyService.remove(id);
  }
}
