import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { PonenteService } from './ponente.service';
import { CreatePonenteDto } from './dto/create-ponente.dto';

@Controller('ponente')
export class PonenteController {
  constructor(private readonly ponenteService: PonenteService) {}

  @Post()
  async create(@Body() createPonenteDto: CreatePonenteDto) {
    return this.ponenteService.create(createPonenteDto);
  }

  @Get(':id')
  async findPonenteById(@Param('id') id: number) {
    return this.ponenteService.findPonenteById(id);
  }

  @Delete(':id')
  async eliminarPonente(@Param('id') id: number) {
    return this.ponenteService.eliminarPonente(id);
  }
}
