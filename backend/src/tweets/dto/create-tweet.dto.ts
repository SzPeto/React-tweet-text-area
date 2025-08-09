import { IsInt, IsPositive, IsString, IsNotEmpty } from "class-validator";

export class CreateTweetDto{
    @IsInt()
    @IsPositive()
    id: number;

    @IsString()
    @IsNotEmpty()
    content: string;
}