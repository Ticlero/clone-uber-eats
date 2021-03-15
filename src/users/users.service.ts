import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    // 계정을 생성할 때 생각해야 하는 것
    // 중복된 email이 DB에 존재하는지 확인
    // check new User => create user & hash the password
    try {
      const exist = await this.users.findOne({ email });
      if (exist) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      const user = await this.users.save(
        this.users.create({ email, password, role }),
      );

      await this.verification.save(
        this.verification.create({
          user,
        }),
      );

      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" }; //error massage  ok and message
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    //1. find the user with the email 입력된 이메일을 가진 유저가 있는지 찾기
    //2. check if the password is correct 로그인에 사용된 비밀번호가 맞는지 확인
    //3. make a JWT and give it to user JWT를 만들고 user에게 주기
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Worng Password',
        };
      }
      const token = this.jwtService.sign(user.id);
      // const token = jwt.sign(
      //   { id: user.id, password: user.password },
      //   this.config.get('SECRET_KEY'),
      // );
      return {
        ok: true,
        token: token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async findById(id: number): Promise<User> {
    return this.users.findOne({ id });
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<User> {
    const user = await this.users.findOne(userId);
    if (email) {
      user.email = email;
      user.verified = false;
      await this.verification.save(this.verification.create({ user }));
    }
    if (password) {
      user.password = password;
    }
    return this.users.save(user);
  }

  async verifyEmail(code: string): Promise<boolean> {
    // step 1. 인증하려는 유저의 verification 찾기
    const verification = await this.verification.findOne(
      { code },
      { relations: ['user'] },
    );
    if (verification) {
      verification.user.verified = true;
      this.users.save(verification.user);
    }
    return false;
  }
}
