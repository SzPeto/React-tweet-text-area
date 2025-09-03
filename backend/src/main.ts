import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api') // Be sure to put it before the app begins to listen
  app.enableCors({
        origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173', // Vite dev server
        credentials: true
      })
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // if you provide a field to json that doen't exist in DTO, it omits
      forbidNonWhitelisted: true, // Throws an error if the JSON contains properties not defined in the DTO
      transform: true,  // important: converts JSON to class instances automatically
    }))
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()