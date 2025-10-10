import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const reservation = this.reservationRepository.create(createReservationDto);
    return this.reservationRepository.save(reservation);
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find({ relations: ['user', 'book'] });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['user', 'book'],
    });
    if (!reservation) {
      throw new NotFoundException(
        `Rezervacija sa ID-jem #${id} nije pronađena.`,
      );
    }
    return reservation;
  }

  async update(
    id: number,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const reservation = await this.reservationRepository.preload({
      id: id,
      ...updateReservationDto,
    });
    if (!reservation) {
      throw new NotFoundException(
        `Rezervacija sa ID-jem #${id} nije pronađena.`,
      );
    }
    return this.reservationRepository.save(reservation);
  }

  async remove(id: number): Promise<Reservation> {
    const reservationToRemove = await this.findOne(id);
    return this.reservationRepository.remove(reservationToRemove);
  }
}
