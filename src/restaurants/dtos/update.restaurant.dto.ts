import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantArgDto } from './create-restaurant.dto';

// @InputType()
// export class UpdateRestaurantDto extends PartialType(CreateRestaurantArgDto) {}
// 2021-03-04 id를 받아서 해당 하는 레코드를 변경하려고 함. 문제는 id를 어떻게 받냐
// 방법은 2가지
// 첫 번째는 UpdateRestaurant() Mutation에서 @Args('id') 를 활용하여 id 받기
// 두 번째는 id와 UpdateRestaurantDto를 합치기

@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantArgDto) {}

@InputType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
