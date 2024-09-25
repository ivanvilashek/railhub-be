import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { ScheduleSortKeys, SortDir } from '../enums'
import { Transform } from 'class-transformer'

export class GetSchedulesDto {
  @IsNumber()
  @Transform((data) => Number(data.value))
  @ApiProperty({ type: Number, description: 'Page', example: 1 })
  readonly page: number

  @IsNumber()
  @Transform((data) => Number(data.value))
  @ApiProperty({ type: Number, description: 'Limit', example: 10 })
  readonly limit: number

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Search query',
    required: false,
    example: 'Kyiv',
  })
  readonly search?: string

  @IsEnum(ScheduleSortKeys)
  @IsOptional()
  @ApiProperty({
    enum: ScheduleSortKeys,
    description: 'Sort by',
    required: false,
    example: ScheduleSortKeys.ARRIVAL_AT,
  })
  readonly sort?: ScheduleSortKeys

  @IsEnum(SortDir)
  @IsOptional()
  @ApiProperty({
    enum: SortDir,
    description: 'Sort dir',
    required: false,
    example: SortDir.DESC,
  })
  readonly dir?: SortDir
}
