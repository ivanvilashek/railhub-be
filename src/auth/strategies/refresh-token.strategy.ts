import { EnvironmentVariables, JwtPayload } from '@app/common/interfaces'
import { Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
    })
  }

  validate(payload: JwtPayload) {
    return payload
  }
}
