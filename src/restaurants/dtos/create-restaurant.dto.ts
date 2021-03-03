import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

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
 *
 * OmitType( entity, 제외할 field, 새로 만들어질 class의 type )
 * OmitType은 entity를 받아서 새로운 객체를 만들어주는 역할을 한다.
 * 3가지 arguments가 들어가는데, 첫 번째 인자는 base가 될 entity,
 * 두 번째 인자는 base entity의 field중 제외하고 만들고 싶은 field
 * 세 번째 인자는 새로 만들어질 class의 type을 정한다. default로  base entity의 type을 따름
 * 명시해 주면 변경됨
 */
@InputType()
export class CreateRestaurantArgDto extends OmitType(
  Restaurant,
  ['id'],
  InputType,
) {}
