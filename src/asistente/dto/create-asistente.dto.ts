import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAsistenteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El codigo no puede estar vacío' })
  codigo: string;

  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;
}
