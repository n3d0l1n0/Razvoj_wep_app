import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Librarian } from './librariran.entity';
import { CreateLibrarianDto } from './dto/create-librarian.dto';
import { UpdateLibrarianDto } from './dto/update-librarian.dto';

@Injectable()
export class LibrarianService {
  constructor(
    @InjectRepository(Librarian)
    private librarianRepository: Repository<Librarian>,
  ) {}

  create(createLibrarianDto: CreateLibrarianDto): Promise<Librarian> {
    const librarian = this.librarianRepository.create(createLibrarianDto);
    return this.librarianRepository.save(librarian);
  }

  findAll(): Promise<Librarian[]> {
    return this.librarianRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Librarian> {
    const librarian = await this.librarianRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!librarian) {
      throw new NotFoundException(
        `Bibliotekar sa ID-jem #${id} nije pronađen.`,
      );
    }
    return librarian;
  }

  async update(
    id: number,
    updateLibrarianDto: UpdateLibrarianDto,
  ): Promise<Librarian> {
    const librarian = await this.librarianRepository.preload({
      id: id,
      ...updateLibrarianDto,
    });
    if (!librarian) {
      throw new NotFoundException(
        `Bibliotekar sa ID-jem #${id} nije pronađen.`,
      );
    }
    return this.librarianRepository.save(librarian);
  }

  async remove(id: number): Promise<Librarian> {
    const librarianToRemove = await this.findOne(id);
    return this.librarianRepository.remove(librarianToRemove);
  }
}
