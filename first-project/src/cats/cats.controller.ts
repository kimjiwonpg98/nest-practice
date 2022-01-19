import {
  Body,
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
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/common/exceptions/http-exception.filter";
import { SuccessInterceptor } from "src/common/interceptors/success.interceptor";
import { CatsService } from "./cats.service";
import { ReadOnlyCatDto } from "./dto/cat.dto";
import { CatRequestDto } from "./dto/cats.request.dto";

@Controller("cats")
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: "현재 고양이 가져오기" })
  @Get()
  getCurrentCat() {}

  @ApiResponse({
    status: 500,
    description: "ServerError",
  })
  @ApiResponse({
    status: 201,
    description: "Success",
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: "회원가입" })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: "로그인" })
  @Post("login")
  login() {}

  @ApiOperation({ summary: "로그아웃" })
  @Post("logout")
  async logout() {}

  @ApiOperation({ summary: "이미지 업로드" })
  @Post("upload/cats")
  uploadCatImg() {}
}
