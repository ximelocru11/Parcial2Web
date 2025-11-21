import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAsistenteDto } from './dto/create-asistente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistente } from './entities/asistente.entity';
import { Repository } from 'typeorm';
import { Evento } from 'src/evento/entities/evento.entity';

@Injectable()
export class AsistenteService {
  constructor(
    @InjectRepository(Asistente)
    private readonly asistenteRepo: Repository<Asistente>,
    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,
  ) {}

  async registrarAsistente(
    eventoId: number,
    createAsistenteDto: CreateAsistenteDto,
  ) {
    const evento = await this.eventoRepo.findOne({
      where: { id: eventoId },
    });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }

    const asistentes = await this.findAsistentesEvento(eventoId);

    if (asistentes.length >= evento.auditorio.capacidad) {
      throw new BadRequestException(
        'El auditorio ha alcanzado su capacidad máxima',
      );
    }

    if (asistentes.some((a) => a.email === createAsistenteDto.email)) {
      throw new BadRequestException(
        'Este email ya está registrado para este evento',
      );
    }

    const asistente = this.asistenteRepo.create(createAsistenteDto);
    asistente.evento = evento;
    return this.asistenteRepo.save(asistente);
  }

  async findAsistentesEvento(eventoId: number) {
    const evento = await this.eventoRepo.findOne({
      where: { id: eventoId },
      relations: ['asistentes'],
    });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }
    return evento.asistentes;
  }
}
