import { PrismaService } from '@app/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  public async findById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } })
  }

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data })
  }

  public async update(data: Prisma.UserUpdateInput, id: string): Promise<User> {
    return this.prisma.user.update({ data, where: { id } })
  }
}
