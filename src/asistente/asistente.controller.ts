import { Controller, Body } from '@nestjs/common';
import { AsistenteService } from './asistente.service';

@Controller('asistente')
export class AsistenteController {
  constructor(private readonly asistenteService: AsistenteService) {}
}
