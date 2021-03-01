import { ArgsType, Field, Float, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ArgsType()
export class createDogDto {
  @Field((type) => String)
  @IsString()
  name: string;

  @Field((type) => Int)
  @IsNumber()
  age: number;

  @Field((type) => Float)
  @IsNumber()
  weight: number;
}
