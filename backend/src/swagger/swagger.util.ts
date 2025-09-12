import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, type SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Tweets API')
    .setDescription('API for tweets and users')
    .setVersion('1.0')
    .addServer('http://localhost:3000/api')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token'
    )
    .build()
    
  const docOptions: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: true, // remove "/api" from each path in the spec
  }

  const document = SwaggerModule.createDocument(app, config, docOptions)
  SwaggerModule.setup('api/docs', app, document)
}