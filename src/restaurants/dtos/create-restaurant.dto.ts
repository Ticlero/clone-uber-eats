import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

/**
 * 
 * GraphQL => createRestaurantInputType(createRestaurantInput:{
    name:"test",
    isVegan:true,
    address:"test2",    
    ownersName:"test3"
  })
 */
@InputType()
export class CreateRestaurantInputDto {
  @Field((type) => String)
  name!: string;
  @Field((type) => Boolean)
  isVegan!: boolean;
  @Field((type) => String)
  address!: string;
  @Field((type) => String)
  ownersName: string;
}

/**
 * GraphQL => createRestaurantArgsType(name:"shshs", isVegan:true, address:"sgsg", ownersName:"tear")
 */
@ArgsType()
export class CreateRestaurantArgDto {
  @Field((type) => String)
  @IsString()
  @Length(5, 10)
  name: string;

  @Field((type) => Boolean)
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String)
  @IsString()
  address: string;

  @Field((type) => String)
  @IsString()
  ownersName: string;
}
