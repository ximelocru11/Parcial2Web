import { Controller, Post, Body } from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';

@Controller('auditorio')
export class AuditorioController {
  constructor(private readonly auditorioService: AuditorioService) {}

  @Post()
  async create(@Body() createAuditorioDto: CreateAuditorioDto) {
    return this.auditorioService.create(createAuditorioDto);
  }
}
