//데이터베이스의 모델이라고 생각

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() //graphQL의 Schema
@Entity() // DB에 저장하기 위한 TypeORM의 모델 두 decorator를 사용하여 동시에 만들 수 있음
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5, 20)
  name: string;

  @Field((type) => Boolean, { defaultValue: true }) // graphQL을 위한 default 값 지정 nullable과는 다름
  @Column({ default: true }) // 값이 비어 있을 경우 default값 지정 - DB를 위함
  @IsOptional() // validation 해당 필드 값이 비어 있으면 무시함
  @IsBoolean()
  isVegan?: boolean;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => String)
  @Column()
  @IsString()
  ownersName: string;

  @Field((type) => String)
  @Column()
  @IsString()
  categoryName: string;
}
