import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantResolver } from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';

@Module({
  //restaurants.module에서 rastaurant repository가 필요하므로 여기에 Repository를 import
  imports: [TypeOrmModule.forFeature([Restaurant])], //RestaurantService에서 repository를 사용하기 위해
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}
