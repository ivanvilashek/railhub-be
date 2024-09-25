import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { AccessTokenGuard, EnvironmentVariables } from '@app/common'
import { AuthModule } from '@app/auth'
import { UserModule } from '@app/user'
import { PrismaModule } from '@app/prisma'
import { ScheduleModule } from '@app/schedule'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object<EnvironmentVariables>({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(4000),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
      }),
    }),

    PrismaModule,

    AuthModule,

    UserModule,

    ScheduleModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
