import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { CurrentUser } from '@app/common'
import { User } from '@prisma/client'

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth('JWT Access')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Retrieve current user profile' })
  @ApiCreatedResponse({ description: 'Returns current user profile' })
  async getCurrentUser(
    @CurrentUser('sub') id: string,
  ): Promise<Omit<User, 'hash'>> {
    return this.userService.findById(id)
  }
}
