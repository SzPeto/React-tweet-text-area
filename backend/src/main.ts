import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { initSwagger } from './swagger/swagger.util'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: true,
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // if you provide a field to json that doesn't exist in DTO, it omits
    forbidNonWhitelisted: true, // Throws an error if the JSON contains properties not defined in the DTO
    transform: true,  // important: converts JSON to class instances automatically
  }))
  
  initSwagger(app)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()