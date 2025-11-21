import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';
import { Auditorio } from './entities/auditorio.entity';

@Injectable()
export class AuditorioService {
  constructor(
    @InjectRepository(Auditorio)
    private readonly auditorioRepo: Repository<Auditorio>,
  ) {}

  async create(createAuditorioDto: CreateAuditorioDto) {
    if (createAuditorioDto.capacidad <= 0) {
      throw new BadRequestException('La capacidad debe ser un número positivo');
    }
    const auditorio = this.auditorioRepo.create(createAuditorioDto);
    return this.auditorioRepo.save(auditorio);
  }
}
