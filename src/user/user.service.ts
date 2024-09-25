import { PrismaService } from '@app/prisma/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  public async findById(id: string): Promise<Omit<User, 'hash'>> {
    const user = await this.prisma.user.findUnique({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        id: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id },
    })

    if (!user) {
      throw new NotFoundException('No user found')
    }

    return user
  }

  public async create(
    data: Omit<Prisma.UserCreateInput, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    return this.prisma.user.create({ data })
  }

  public async update(
    data: Omit<Prisma.UserUpdateInput, 'id' | 'createdAt' | 'updatedAt'>,
    id: string,
  ): Promise<User> {
    return this.prisma.user.update({ data, where: { id } })
  }
}
