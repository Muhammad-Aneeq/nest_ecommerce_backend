import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/repositories';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { SignUpDto } from './dto/singup.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const user = await this.usersRepository.createUser(signUpDto);

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async singIn(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (user) {
      const { _id, email, roles } = user;
      const payload: JwtPayload = { _id, email, roles };
      return this.signJwt(payload);
    }
  }

  async signJwt(
    payload: any,
    expiresIn?: string,
  ): Promise<{ access_token: string }> {
    try {
      let jwtOptions = {};
      if (expiresIn) jwtOptions = { expiresIn };
      const token = this.jwtService.sign(payload);

      return { access_token: token };
    } catch (error) {
      console.error(error);
    }
  }

  async decodeJwt(token: string): Promise<any> {
    try {
      const verifiedToken: JwtPayload = await this.jwtService.verify(token);
      return verifiedToken;
    } catch (error) {
      console.error(error);
    }
  }
}
