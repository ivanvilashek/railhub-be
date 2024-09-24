import {
  CurrentUser,
  JwtPayload,
  Public,
  RefreshTokenGuard,
  SignInDto,
  SignUpDto,
  Tokens,
} from '@app/common'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

@Controller('auth')
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Initialize user sign up' })
  @ApiCreatedResponse({ description: 'Returns access and refresh tokens' })
  async signUp(@Body() data: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(data)
  }

  @Post('login')
  @ApiOperation({ summary: 'Initialize user sign in' })
  @ApiCreatedResponse({ description: 'Returns access and refresh tokens' })
  async signIn(@Body() data: SignInDto): Promise<Tokens> {
    return this.authService.signIn(data)
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiBearerAuth('JWT Refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiCreatedResponse({
    description: 'Access token has been successfully refreshed',
  })
  async refreshAccessToken(
    @CurrentUser() data: JwtPayload,
  ): Promise<Pick<Tokens, 'accessToken'>> {
    const { sub, email } = data
    return this.authService.refreshAccessToken({ sub, email })
  }
}
