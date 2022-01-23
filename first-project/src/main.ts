import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as expressBasicAuth from "express-basic-auth";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/exceptions/http-exception.filter";
import * as path from "path";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 스키마에서 클래스 validation을 쓰려면 이걸 등록해야됌!!!
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    ["/docs", "/docs-json"],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  app.enableCors({
    origin: true, // 개발용 (배포할 때는 특정 url)
    credentials: true,
  });

  app.useStaticAssets(path.join(__dirname, "./common", "uploads"), {
    prefix: "/media",
  });

  const config = new DocumentBuilder()
    .setTitle("C.I.C")
    .setDescription("Cats api")
    .setVersion("1.0.0")
    .addTag("cats")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
