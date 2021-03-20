import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constant';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Global()
@Module({})
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,

      // providers는 이 것에 등록되어있는 class, value 등등을 제공한다는 의미
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],

      // providers에 등록된 것을을 모두 exports 외부에서 사용할 수 있도록
      exports: [JwtService],
    };
  }
}
