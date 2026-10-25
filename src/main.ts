import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  
  const configService = app.get(ConfigService)
  const port = configService.get('PORT', 3001)
  const appName = configService.get('APP_NAME', 'non_db')

  await app.listen(port);
  console.log(`☕ Applicatoin  ${appName} is running on : ${port}`)
  
}
await bootstrap();
