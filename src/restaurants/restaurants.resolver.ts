import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateRestaurantArgDto,
  CreateRestaurantInputDto,
} from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}
  //Query는 첫번 째 agument로 function이 필요
  //   @Query(() => Boolean)
  //   isPizzaGood(): boolean {
  //     return true;
  //   }

  // @Query((returns) => Restaurant)
  // myRestaurant() {
  //   return true;
  // }

  //GraphQL Query 생성방법
  //@Query(인자는 function이고 GraphQL에서 사용되는 반환 값을 나타냄)
  //다음에 나오는 restaurants함수의 인자는 graphql에서 넘겨줄 인자들을 정리(arguments) Restaurant[]는 typescript의 반환 값
  // @Query((returns) => [Restaurant])
  // restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
  //   console.log(veganOnly);
  //   return [];
  // }

  @Query((returns) => [Restaurant])
  restaurant(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation((returns) => Boolean)
  createRestaurantInputType(
    @Args('createRestaurantInput')
    createRestaurantInput: CreateRestaurantInputDto,
  ): boolean {
    console.log(createRestaurantInput);
    return true;
  }

  @Mutation((returns) => Boolean)
  createRestaurantArgsType(
    @Args() CreateRestaurantArgDto: CreateRestaurantArgDto,
  ): boolean {
    console.log(CreateRestaurantArgDto);
    return true;
  }
}
