import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantArgDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update.restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) //const userRepository = connection.getRepository(User);
    private readonly restaurants: Repository<Restaurant>, //restaurants === userRepository 같은 역할을 하기 위함. 즉, entity가 Repository 객체를 활용하여 db에 접근을 가능하게 만듦
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }
  createRestaurant(
    createRestaurantArgDto: CreateRestaurantArgDto,
  ): Promise<Restaurant> {
    // const newRestaurant = new Restaurant();
    // newRestaurant.name = CreateRestaurantArgDto.name;
    const newRestaurant = this.restaurants.create(createRestaurantArgDto);
    return this.restaurants.save(newRestaurant);
  }
  updateRestaurant({ id, data }: UpdateRestaurantDto) {
    return this.restaurants.update(id, { ...data }); // update함수의 첫 번째 인자는 테이블에서 변경할 데이터를 찾는 기준이 되는 필드, 두 번째 인자는 변경될  데이터
  }
}
