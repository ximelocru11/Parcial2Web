import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePonenteDto } from './dto/create-ponente.dto';
import { Ponente } from './entities/ponente.entity';
import { Evento } from 'src/evento/entities/evento.entity';

@Injectable()
export class PonenteService {
  constructor(
    @InjectRepository(Ponente)
    private readonly ponenteRepo: Repository<Ponente>,
    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,
  ) {}

  async create(createPonenteDto: CreatePonenteDto) {
    const { email, tipoPonente } = createPonenteDto;

    if (tipoPonente === 'Interno' && !email.endsWith('.edu')) {
      throw new BadRequestException(
        'El email de un ponente interno debe terminar en .edu',
      );
    }

    if (
      tipoPonente === 'Invitado' &&
      (!email.includes('@') || !email.includes('.'))
    ) {
      throw new BadRequestException(
        'El email de un ponente invitado debe ser válido',
      );
    }

    const ponente = this.ponenteRepo.create(createPonenteDto);
    return this.ponenteRepo.save(ponente);
  }

  async findPonenteById(id: number) {
    const ponente = await this.ponenteRepo.findOne({ where: { id } });

    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }

    return ponente;
  }

  async eliminarPonente(id: number) {
    const ponente = await this.ponenteRepo.findOne({
      where: { id },
      relations: ['eventos'],
    });

    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }

    if (ponente.eventos && ponente.eventos.length > 0) {
      throw new BadRequestException(
        'No se puede eliminar: el ponente tiene eventos asociados',
      );
    }

    await this.ponenteRepo.remove(ponente);
  }
}
