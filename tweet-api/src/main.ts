import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Be sure to put it before the app begins to listen
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
