import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as config from 'config';

const jwtConfig = config.jwt;
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;

    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
