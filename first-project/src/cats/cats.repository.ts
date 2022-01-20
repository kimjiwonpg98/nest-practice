import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cat } from "./cats.schema";
import { CatRequestDto } from "./dto/cats.request.dto";

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}
  async existByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });
      return result;
    } catch (err) {
      throw new HttpException("db error", 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select("-password");
    // select는 필드 중 원하는걸 가져옴 (-는 빼고 가져온다는 뜻)
    return cat;
  }
}