import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'; // typescript or nestjs module이 아닌 순수 javascipt 패키지일 경우 module  가져오는 방법
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    GraphQLModule.forRoot({
      //스키마 파일을 자동으로 생성, true로할 경우 메모리에 스키마 파일을 저장
      //autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true, //App 어디서나 config 모듈에 접근 할 수 있도록 하는 옵션
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test', //개발 환경, 테스트 환경, 배포환경에 따라 conf 파일을 변경
      ignoreEnvFile: process.env.NODE_ENV === 'prod', //서버에 deploy 할 때 환경변수 파일을 사용하지 않는 옵션
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }), //환경변수로 들어오는 값을 유효성 검사하기 위한 옵션
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV !== 'prod',
      entities: [User],
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
