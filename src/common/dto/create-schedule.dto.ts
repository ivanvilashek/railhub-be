import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateScheduleDto
  implements Omit<Prisma.ScheduleCreateInput, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'Train Id', example: '749' })
  readonly train: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'Arrival Place', example: 'Mukachevo' })
  readonly arrival: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'Departure Place', example: 'Lviv' })
  readonly departure: string

  @IsDateString()
  @ApiProperty({
    type: String,
    title: 'Arrival Date',
    example: '2024-09-25T14:22:14Z',
  })
  readonly arrivalAt: string | Date

  @IsDateString()
  @ApiProperty({
    type: String,
    title: 'Departure Date',
    example: '2024-09-25T14:22:14Z',
  })
  readonly departureAt: string | Date

  @IsNumber()
  @ApiProperty({ type: Number, title: 'Ticket Price', example: 100 })
  readonly price: number
}
