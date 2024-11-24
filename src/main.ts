import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.enableCors({
    origin: '*',
  });
  await app.listen(port);
  console.log(`Aplicación corriendo en http://localhost:${port}`);
}
bootstrap();
