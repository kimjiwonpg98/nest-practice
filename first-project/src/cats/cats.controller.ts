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
} from "@nestjs/common";
import { HttpExceptionFilter } from "src/http-exception.filter";
import { CatsService } from "./cats.service";

@Controller("cats")
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCats() {
    throw new HttpException("api is broken", 401);
  }

  @Get(":id")
  getOneCat(@Param("id", ParseIntPipe) param) {
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
