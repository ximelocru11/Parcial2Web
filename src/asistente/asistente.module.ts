import { Module } from '@nestjs/common';
import { AsistenteService } from './asistente.service';
import { AsistenteController } from './asistente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from 'src/evento/entities/evento.entity';
import { Asistente } from './entities/asistente.entity';

@Module({
  controllers: [AsistenteController],
  providers: [AsistenteService],
  imports: [TypeOrmModule.forFeature([Evento, Asistente])],
})
export class AsistenteModule {}
