import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verifications } from './entities/verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verifications])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
