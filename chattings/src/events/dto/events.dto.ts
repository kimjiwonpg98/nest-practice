import { IsDefined, IsIn, IsString } from 'class-validator';

export class EventsDto {
    @IsString()
    @IsDefined()
    nickname: string;

    @IsString()
    @IsIn(['basic', 'secret'])
    room: string;
}
