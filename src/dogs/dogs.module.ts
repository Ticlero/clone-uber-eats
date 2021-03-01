import { Module } from '@nestjs/common';
import { DogResolver } from './dogs.resolver';

@Module({
  providers: [DogResolver],
})
export class DogsModule {}
