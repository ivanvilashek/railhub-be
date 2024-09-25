import { GetSchedulesDto, Pagination, SortDir } from '@app/common'
import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { Prisma, Schedule } from '@prisma/client'

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<Schedule> {
    return this.prisma.schedule.findUnique({ where: { id } })
  }

  async getAll(filters: GetSchedulesDto): Promise<Pagination<Schedule>> {
    const { search, sort, dir } = filters

    const page = Number(filters.page) || 1
    const limit = Number(filters.limit) || 10

    const where: Prisma.ScheduleWhereInput = {
      ...(search && {
        OR: [
          { arrival: { contains: search, mode: 'insensitive' } },
          { departure: { contains: search, mode: 'insensitive' } },
          { train: { contains: search, mode: 'insensitive' } },
        ],
      }),
    }

    const [data, total] = await Promise.all([
      this.prisma.schedule.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        ...(sort && {
          orderBy: {
            [sort]: dir || SortDir.DESC,
          },
        }),
      }),
      this.prisma.schedule.count({ where }),
    ])

    return { data, total }
  }

  async create(
    data: Omit<Prisma.ScheduleCreateInput, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Schedule> {
    return this.prisma.schedule.create({ data })
  }

  public async update(
    data: Omit<Prisma.ScheduleUpdateInput, 'id' | 'createdAt' | 'updatedAt'>,
    id: string,
  ): Promise<Schedule> {
    return this.prisma.schedule.update({ data, where: { id } })
  }

  async delete(id: string): Promise<Schedule> {
    return this.prisma.schedule.delete({ where: { id } })
  }
}
