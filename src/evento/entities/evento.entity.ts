import { Asistente } from 'src/asistente/entities/asistente.entity';
import { Auditorio } from 'src/auditorio/entities/auditorio.entity';
import { Ponente } from 'src/ponente/entities/ponente.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  duracionHoras: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fecha: Date;

  @Column()
  estado: string;

  @ManyToOne(() => Ponente, (ponente) => ponente.eventos)
  ponente: Ponente;

  @ManyToOne(() => Auditorio, (auditorio) => auditorio.eventos)
  auditorio: Auditorio;

  @OneToMany(() => Asistente, (asistente) => asistente.evento)
  asistentes: Asistente[];
}
