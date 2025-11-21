import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventoDto } from './dto/create-evento.dto';
import { Evento } from './entities/evento.entity';
import { Ponente } from 'src/ponente/entities/ponente.entity';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,
    @InjectRepository(Ponente)
    private readonly ponenteRepo: Repository<Ponente>,
  ) {}

  async create(createEventoDto: CreateEventoDto) {
    const { duracionHoras, descripcion, ponenteId } = createEventoDto;

    if (duracionHoras <= 0) {
      throw new BadRequestException('La duración debe ser un número positivo');
    }
    const ponente = await this.ponenteRepo.findOne({
      where: { id: ponenteId },
    });
    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }

    if (
      ponente.tipoPonente === 'Invitado' &&
      (!descripcion || descripcion.length < 50)
    ) {
      throw new BadRequestException(
        'La descripción debe tener al menos 50 caracteres para ponentes invitados',
      );
    }

    const evento = this.eventoRepo.create(createEventoDto);
    return this.eventoRepo.save(evento);
  }

  async aprobarEvento(id: number) {
    const evento = await this.eventoRepo.findOne({
      where: { id },
      relations: ['auditorio'],
    });

    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }

    if (!evento.auditorio) {
      throw new BadRequestException(
        'No se puede aprobar el evento: no tiene auditorio asignado',
      );
    }

    evento.estado = 'Confirmado';
    return this.eventoRepo.save(evento);
  }

  async eliminarEvento(id: number) {
    const evento = await this.eventoRepo.findOne({ where: { id } });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }
    if (evento.estado === 'Confirmado') {
      throw new BadRequestException(
        'No se puede eliminar un evento confirmado',
      );
    }
    await this.eventoRepo.remove(evento);
  }

  async findEventoById(id: number) {
    const evento = await this.eventoRepo.findOne({ where: { id } });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }
    return evento;
  }
}
