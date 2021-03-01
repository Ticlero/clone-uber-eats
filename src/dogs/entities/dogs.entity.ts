import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Dog {
  @Field((type) => String)
  name: string;

  @Field((type) => Int)
  age: number;

  @Field((type) => Float)
  weight: number;
}
