import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  titulo: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  descripcion: string;

  @IsDateString()
  fecha: Date;

  @IsString()
  @IsIn(['Propuesto', 'Aprobado', 'Rechazado'], {
    message: 'El estado debe ser Propuesto, Aprobado o Rechazado',
  })
  estado: string;

  @IsInt()
  @Min(1, { message: 'La duración debe ser un número entero positivo' })
  duracionHoras: number;

  @IsInt()
  @Min(1, { message: 'El ID del ponente debe ser un número entero positivo' })
  ponenteId: number;

  @IsInt()
  @Min(1, { message: 'El ID del auditorio debe ser un número entero positivo' })
  auditorioId: number;
}
