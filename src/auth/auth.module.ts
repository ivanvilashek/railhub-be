import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from '@app/user'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies'

@Module({
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  imports: [UserModule, JwtModule.register({ global: true })],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
