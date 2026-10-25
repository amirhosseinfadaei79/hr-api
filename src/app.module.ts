import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createObserveModule } from '@nestjs/observe';

export const { ObserveModule, ObserveInstrument } = createObserveModule();
@Module({
  imports: [
    // configModule for get env variable data 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    // connect to database with typeorm
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // اگر ConfigModule گلوبال است، این خط اختیاری است
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASS', ''),
        database: configService.get('DB_NAME', 'hr_db'),
        entities: [import.meta.dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNCHRONIZE', 'true') === 'true',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
