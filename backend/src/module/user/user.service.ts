import {
  UnauthorizedException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare } from 'bcryptjs';
import { User, UserDocument } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  ping() {
    return 'This module is alive';
  }

  async login(payload: LoginDto, res) {
    try {
      const user = await this.userModel.findOne({ email: payload.email });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // match password
      const isMatched = await compare(payload.password, user.password);

      if (!isMatched) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // generate token
      const accessToken = await this.jwtService.sign({ id: user.id });

      res.cookie('SESSION_IDs', accessToken, {
        secure: process.env.NODE_ENV == 'production', // Set to true if your app is served over HTTPS
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hour
        path: '/',
      });

      return res.json({
        message: 'Login successful',
        email: user.email,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
