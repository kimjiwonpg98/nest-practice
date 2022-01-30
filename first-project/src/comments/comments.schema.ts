import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive, IsString } from "class-validator";
import { Document, SchemaOptions, Types } from "mongoose";

const options: SchemaOptions = {
  timestamps: true, // db에서 시간 찍어줌
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: "고양이 ID",
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    unique: true,
    ref: "cats",
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: "댓글 내용",
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: "좋아요 수",
  })
  @Prop({
    required: true,
  })
  @IsPositive()
  @IsNotEmpty()
  likeCount: number;

  @Prop({
    default:
      "https://user-images.githubusercontent.com/75289370/126998921-ec7865fb-0c01-4b98-97a4-0dc09bf21bf3.jpg",
  })
  @IsString()
  imgUrl: string;

  @ApiProperty({
    description: "작성 대상 게시물",
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    unique: true,
    ref: "cats",
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
