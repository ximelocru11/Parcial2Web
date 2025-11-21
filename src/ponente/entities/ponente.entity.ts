import { Evento } from 'src/evento/entities/evento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Ponente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  tipoPonente: string;
  //un tipoPonente (string: Interno, Invitado)

  @Column()
  especialidad: string;

  @OneToMany(() => Evento, (evento) => evento.ponente)
  eventos: Evento[];
}
