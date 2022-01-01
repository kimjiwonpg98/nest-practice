import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { CatsService } from "./cats.service";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCats() {
    return "all cats";
  }

  @Get(":id")
  getOneCat(@Param() param) {
    return `${param.id} is here`;
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
