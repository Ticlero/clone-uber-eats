import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
