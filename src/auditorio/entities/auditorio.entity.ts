import { Evento } from 'src/evento/entities/evento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Auditorio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  capacidad: number;

  @Column()
  nombre: string;

  @Column()
  ubicacion: string;

  @OneToMany(() => Evento, (evento) => evento.ponente)
  eventos: Evento[];
}
