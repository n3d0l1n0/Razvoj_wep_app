import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './loan.entity';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
  ) {}

  create(createLoanDto: CreateLoanDto): Promise<Loan> {
    const loan = this.loanRepository.create(createLoanDto);
    return this.loanRepository.save(loan);
  }

  findAll(): Promise<Loan[]> {
    return this.loanRepository.find({ relations: ['user', 'book'] });
  }

  async findOne(id: number): Promise<Loan> {
    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: ['user', 'book'],
    });
    if (!loan) {
      throw new NotFoundException(`Zaduženje sa ID-jem #${id} nije pronađeno.`);
    }
    return loan;
  }

  async update(id: number, updateLoanDto: UpdateLoanDto): Promise<Loan> {
    const loan = await this.loanRepository.preload({
      id: id,
      ...updateLoanDto,
    });
    if (!loan) {
      throw new NotFoundException(`Zaduženje sa ID-jem #${id} nije pronađeno.`);
    }
    return this.loanRepository.save(loan);
  }

  async remove(id: number): Promise<Loan> {
    const loanToRemove = await this.findOne(id);
    return this.loanRepository.remove(loanToRemove);
  }
}
