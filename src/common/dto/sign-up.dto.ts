import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsEmail, IsString } from 'class-validator'

export class SignUpDto implements Omit<Prisma.UserCreateInput, 'hash'> {
  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, title: 'User email' })
  readonly email: string

  @IsString()
  @ApiProperty({ type: String, title: 'User first name' })
  readonly firstName: string

  @IsString()
  @ApiProperty({ type: String, title: 'User last name' })
  readonly lastName: string

  @IsString()
  @ApiProperty({ type: String, title: 'User password' })
  readonly password: string
}
