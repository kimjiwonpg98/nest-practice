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
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { LoginRequestDto } from "src/auth/dto/login.request.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { CurrentUser } from "src/common/decorators/user.decorator";
import { HttpExceptionFilter } from "src/common/exceptions/http-exception.filter";
import { SuccessInterceptor } from "src/common/interceptors/success.interceptor";
import { Cat } from "./cats.schema";
import { CatsService } from "./cats.service";
import { ReadOnlyCatDto } from "./dto/cat.dto";
import { CatRequestDto } from "./dto/cats.request.dto";

@Controller("cats")
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: "현재 고양이 가져오기" })
  @UseGuards(JwtAuthGuard) //Guard로 jwt가 있는지 확인
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat;
  }

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
  async login(@Body() body: LoginRequestDto) {
    return await this.authService.jwtLogIn(body);
  }

  @ApiOperation({ summary: "로그아웃" })
  @Post("logout")
  async logout() {}

  @ApiOperation({ summary: "이미지 업로드" })
  @Post("upload/cats")
  uploadCatImg() {}
}
