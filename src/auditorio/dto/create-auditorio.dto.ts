import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateAuditorioDto {
  @IsInt()
  @Min(1, { message: 'La capacidad debe ser un número entero positivo' })
  capacidad: number;

  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'La ubicación no puede estar vacía' })
  ubicacion: string;
}
