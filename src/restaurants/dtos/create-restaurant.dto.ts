import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType() //InputType은 각각의 필드들을 구분 안하고 통으로 보내야함
export class CreateRestaurantInputDto {
  @Field((type) => String)
  name!: string;
  @Field((type) => Boolean)
  isVegan!: boolean;
  @Field((type) => String)
  address!: string;
  @Field((type) => String)
  ownersName: string;
}

@ArgsType() //InputType은 각각의 필드들을 부분 적으로 보낼 수 있게 함
export class CreateRestaurantArgDto {
  @Field((type) => String)
  name: string;
  @Field((type) => Boolean)
  isVegan: boolean;
  @Field((type) => String)
  address: string;
  @Field((type) => String)
  ownersName: string;
}
