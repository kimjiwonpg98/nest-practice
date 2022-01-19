import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CatsModule } from "./cats/cats.module";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { ConfigModule } from "@nestjs/config";
import * as mongoose from "mongoose";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useNewUrlParser: true, // url을 읽을 수 있도록 설정
      useUnifiedTopology: true, // 최신 mongodb 드라이버 엔진 사용 설정
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === "dev" ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
    mongoose.set("debug", this.isDev);
  }
}
