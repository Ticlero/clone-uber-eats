import { Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  //Query는 첫번 째 agument로 function이 필요
  //   @Query(() => Boolean)
  //   isPizzaGood(): boolean {
  //     return true;
  //   }

  @Query((returns) => Restaurant)
  myRestaurant() {
    return true;
  }
}
