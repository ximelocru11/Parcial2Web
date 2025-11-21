import { Module } from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { AuditorioController } from './auditorio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from 'src/evento/entities/evento.entity';
import { Auditorio } from './entities/auditorio.entity';

@Module({
  controllers: [AuditorioController],
  providers: [AuditorioService],
  imports: [TypeOrmModule.forFeature([Evento, Auditorio])],
})
export class AuditorioModule {}
