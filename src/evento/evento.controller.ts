import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  async create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventoService.create(createEventoDto);
  }

  @Patch(':id/aprobar')
  async aprobarEvento(@Param('id') id: number) {
    return this.eventoService.aprobarEvento(id);
  }

  @Delete(':id')
  async eliminarEvento(@Param('id') id: number) {
    return this.eventoService.eliminarEvento(id);
  }

  @Get(':id')
  async findEventoById(@Param('id') id: number) {
    return this.eventoService.findEventoById(id);
  }
}
