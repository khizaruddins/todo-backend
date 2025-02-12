import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then((val) => {
    console.log(val, 'app bootstrapped');
  })
  .catch((reason) => {
    console.log(reason, 'Something went wrong while spunning server');
  });
