import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api') // Be sure to put it before the app begins to listen
  app.enableCors({
        origin: ['http://localhost:5173', 'http://192.168.0.116:5173'], // Vite dev server
        credentials: true
      })
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // if you provide a field to json that doen't exist in DTO, it omits
      forbidNonWhitelisted: true, // Throws an error if the JSON contains properties not defined in the DTO
      transform: true,  // important: converts JSON to class instances automatically
    }))
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()