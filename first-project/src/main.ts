import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/exceptions/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 스키마에서 클래스 validation을 쓰려면 이걸 등록해야됌!!!
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
