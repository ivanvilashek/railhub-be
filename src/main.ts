import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from '@app/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('RailHub')
    .setDescription('RailHub API Reference')
    .addBearerAuth({ type: 'http' }, 'JWT Access')
    .addBearerAuth({ type: 'http' }, 'JWT Refresh')
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'API Reference | RailHub',
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  const configService = app.get(ConfigService<EnvironmentVariables>)

  const PORT = configService.get<number>('PORT') || 4000

  const corsOptions: CorsOptions = {
    origin: true,
    methods: ['PUT', 'PATCH', 'POST', 'GET', 'DELETE'],
    credentials: true,
  }

  app.enableCors(corsOptions)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT)
}
bootstrap()
