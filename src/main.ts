import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then((val) => {
    console.log(val, 'something to log');
  })
  .catch((reason) => {
    console.log(reason, 'Something went wrong while spunning server');
  });
