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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  constructor(
    @Inject(CLASSES_SERVICE) private readonly classesService: IClassesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'Result - all classes.' })
  @ApiResponse({ status: 401, description: 'You must log in!' })
  @Roles('admin', 'trainer')
  async findAll(): Promise<Class[]> {
    return await this.classesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'Result - fined class by id.' })
  @ApiResponse({ status: 401, description: 'You must log in!' })
  @ApiResponse({ status: 404, description: 'Such class does not exist.' })
  @Roles('admin', 'trainer')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<Class> {
    return await this.classesService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 201,
    description: 'The class has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'You must log in!' })
  @Roles('admin')
  async create(@Body() clas: CreateClassesDto): Promise<Class> {
    return await this.classesService.saveClass(clas);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'The class has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Such class does not exist.' })
  @ApiResponse({ status: 401, description: 'You must log in!' })
  @Roles('admin')
  async registerUser(
    @Body() clas: CreateClassesDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Class> {
    return await this.classesService.updateClass(id, clas);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'The class has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Such class does not exist.' })
  @ApiResponse({ status: 401, description: 'You must log in!' })
  @Roles('admin')
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<Class> {
    return await this.classesService.removeClass(id);
  }
}
