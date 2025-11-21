import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreatePonenteDto {
  @IsInt()
  @Min(1, { message: 'La cédula debe ser un número entero positivo' })
  cedula: number;

  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;

  @IsString()
  @IsIn(['Interno', 'Invitado'], {
    message: 'El tipo de ponente debe ser "Interno" o "Invitado"',
  })
  tipoPonente: string;

  @IsString()
  @IsNotEmpty({ message: 'La especialidad no puede estar vacía' })
  especialidad: string;
}
