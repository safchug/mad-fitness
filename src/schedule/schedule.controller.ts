import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
  UseGuards,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { IScheduleService, SCHEDULE_SERVICE } from './schedule.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Schedule } from './interface/schedule.interface';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { SearchParamsDto } from './dto/searchParams.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(
    @Inject(SCHEDULE_SERVICE)
    private readonly scheduleService: IScheduleService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Roles('admin', 'trainer')
  async findAll(@Query() dto: SearchParamsDto): Promise<Schedule[]> {
    console.log('GET query:', dto);
    return await this.scheduleService.findAll(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @Roles('admin', 'trainer')
  async getScheduleById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Schedule> {
    return await this.scheduleService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles('admin', 'trainer')
  async createSchedule(@Body() schedule: CreateScheduleDto): Promise<Schedule> {
    return await this.scheduleService.saveSchedule(schedule);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @Roles('admin', 'trainer')
  async updateSchedule(
    @Body() schedule: CreateScheduleDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Schedule> {
    return await this.scheduleService.updateSchedule(id, schedule);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles('admin')
  async removeSchedule(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Schedule> {
    return await this.scheduleService.removeSchedule(id);
  }
}
