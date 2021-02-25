//데이터베이스의 모델이라고 생각

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field((is) => String)
  name: string;

  @Field((type) => Boolean, { nullable: true })
  isGood?: boolean;
}
