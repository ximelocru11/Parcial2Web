import { Evento } from 'src/evento/entities/evento.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Asistente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigoEstudiante: string;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @ManyToOne(() => Evento, (evento) => evento.asistentes)
  evento: Evento;
}
