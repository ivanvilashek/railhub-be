import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignUpDto
  implements
    Omit<Prisma.UserCreateInput, 'hash' | 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: String,
    title: 'User email',
    example: 'john.doe@test.com',
  })
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'User first name', example: 'John' })
  readonly firstName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'User last name', example: 'Doe' })
  readonly lastName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'User password', example: 'qwerty123' })
  readonly password: string
}
