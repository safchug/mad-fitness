import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { IClassesService, CLASSES_SERVICE } from './classes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Class } from './interface/classes.interface';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateClassesDto } from './dto/createClasses.dto';

@Controller('classes')
export class ClassesController {
  constructor(
    @Inject(CLASSES_SERVICE) private readonly classesService: IClassesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Roles('admin', 'trainer')
  async findAll(): Promise<Class[]> {
    return await this.classesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @Roles('admin', 'trainer')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<Class> {
    return await this.classesService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles('admin')
  async create(@Body() clas: CreateClassesDto): Promise<Class> {
    return await this.classesService.saveClass(clas);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @Roles('admin')
  async registerUser(
    @Body() clas: CreateClassesDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Class> {
    return await this.classesService.updateClass(id, clas);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles('admin')
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<Class> {
    return await this.classesService.removeClass(id);
  }
}
