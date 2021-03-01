import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Dog } from './entities/dogs.entity';
import { createDogDto } from './dtos/create-dog.dto';
@Resolver((of) => Dog)
export class DogResolver {
  @Query((returns) => [Dog])
  getDogs(): Dog[] {
    return [];
  }

  @Mutation((returns) => Boolean)
  createDog(@Args() createDogArgs: createDogDto) {
    console.log(createDogArgs);
    return true;
  }
}
