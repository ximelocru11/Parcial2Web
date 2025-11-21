import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ponente } from 'src/ponente/entities/ponente.entity';
import { Evento } from './entities/evento.entity';
import { Asistente } from 'src/asistente/entities/asistente.entity';
import { Auditorio } from 'src/auditorio/entities/auditorio.entity';

@Module({
  controllers: [EventoController],
  providers: [EventoService],
  imports: [TypeOrmModule.forFeature([Ponente, Evento, Asistente, Auditorio])],
})
export class EventoModule {}
