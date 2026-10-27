import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  const configService = app.get(ConfigService)
  const port = configService.get('PORT', 3001)
  const appName = configService.get('APP_NAME', 'non_db')

  // set global api perefix
  app.setGlobalPrefix('api/v1')

  // ebable validatino global
  app.useGlobalPipes()

  // enable response transformation
  app.useGlobalInterceptors(new TransformResponseInterceptor)

  // @Manager swagger
  const managerConfig = new DocumentBuilder( )
    .setTitle('Hr Api - manager routes')
    .setDescription('این روت ها مربوط به نقش کاربری مدیر هست و در پنل manager مورد استفاده قرار گرفت')
    .setVersion('1.0')
    .build()

  const managerDocument = SwaggerModule.createDocument(app, managerConfig, {
    include: [AppModule],
    deepScanRoutes: true
  })

  if (managerDocument.paths) {
    Object.keys(managerDocument.paths).forEach((path) => {
      if (!path.includes('/manager') && !path.includes('/auth')) {
        delete managerDocument.paths[path]
      }
    })
  }
  SwaggerModule.setup('/api/v1/manager/docs', app, managerDocument)

  // @Employee swagger
  const employeeConfig = new DocumentBuilder()
    .setTitle('Hr Api - employee routes')
    .setDescription('این روت ها مربوط به نقش کاربری کارمند هست و در پنل employee مورد استفاده قرار گرفت')
    .setVersion('1.0')
    .build()

  const employeeDocument = SwaggerModule.createDocument(app, employeeConfig, {
    include: [AppModule],
    deepScanRoutes: true
  })

  if (employeeDocument.paths) {
    Object.keys(employeeDocument.paths).forEach((path) => {
      if (!path.includes('/employee') && !path.includes('/auth')) {
        delete employeeDocument.paths[path]
      }
    })
  }
  SwaggerModule.setup('/api/v1/employee/docs', app, employeeDocument)


  await app.listen(port);
  console.log(`☕ Applicatoin  ${appName} is running on : ${port}`)

}
await bootstrap();
