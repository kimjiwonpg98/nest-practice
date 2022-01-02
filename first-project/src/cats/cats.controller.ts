import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from "@nestjs/common";
import { HttpExceptionFilter } from "src/common/exceptions/http-exception.filter";
import { SuccessInterceptor } from "src/common/interceptors/success.interceptor";
import { PositiveIntPipe } from "src/common/pipes/positiveInt.pipe";
import { CatsService } from "./cats.service";

@Controller("cats")
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCats() {
    throw new HttpException("api is broken", 401);
  }

  @Get(":id")
  getOneCat(@Param("id", ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(typeof param);
    return `${param} is here`;
  }

  @Post()
  createCat() {
    return "create cat";
  }

  @Put()
  putCat() {
    return "put cat";
  }

  @Patch()
  patchCat() {
    return "patch cat";
  }

  @Delete()
  deleteCat() {
    return "delete cat";
  }
}
