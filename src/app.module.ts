import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      //스키마 파일을 자동으로 생성, true로할 경우 메모리에 스키마 파일을 저장
      //autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: true,
    }),
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
