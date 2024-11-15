import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:8080', 'https://releaf-visor.onrender.com', '*'], // put into .env
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);

  console.log(`NEST SERVICE IS LISTENING ON ${PORT}`);
}
bootstrap();
