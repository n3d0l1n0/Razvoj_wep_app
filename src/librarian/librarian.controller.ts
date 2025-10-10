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
import { LibrarianService } from './librarian.service';
import { CreateLibrarianDto } from './dto/create-librarian.dto';
import { UpdateLibrarianDto } from './dto/update-librarian.dto';

@Controller('librarians')
export class LibrarianController {
  constructor(private readonly librarianService: LibrarianService) {}

  @Post()
  create(@Body() createLibrarianDto: CreateLibrarianDto) {
    return this.librarianService.create(createLibrarianDto);
  }

  @Get()
  findAll() {
    return this.librarianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.librarianService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLibrarianDto: UpdateLibrarianDto,
  ) {
    return this.librarianService.update(id, updateLibrarianDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.librarianService.remove(id);
  }
}
