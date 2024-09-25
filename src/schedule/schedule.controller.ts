import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import {
  CreateScheduleDto,
  GetSchedulesDto,
  Pagination,
  UpdateScheduleDto,
} from '@app/common'
import { Schedule } from '@prisma/client'

@Controller('schedules')
@ApiTags('Schedules')
@ApiBearerAuth('JWT Access')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get all schedules' })
  @ApiCreatedResponse({ description: 'Returns schedules list' })
  async getAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetSchedulesDto,
  ): Promise<Pagination<Schedule>> {
    return this.scheduleService.getAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get schedule by id' })
  @ApiCreatedResponse({ description: 'Returns schedule document' })
  async getById(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.getById(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create schedule' })
  @ApiCreatedResponse({ description: 'Returns schedule document' })
  async create(@Body() data: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(data)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update schedule by id' })
  @ApiCreatedResponse({ description: 'Returns schedule document' })
  async update(
    @Body() data: UpdateScheduleDto,
    @Param('id') id: string,
  ): Promise<Schedule> {
    return this.scheduleService.update(data, id)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete schedule by id' })
  @ApiCreatedResponse({ description: 'Returns schedule document' })
  async delete(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.delete(id)
  }
}
