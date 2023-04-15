import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // Registers jwt
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn, // default is 1 hour
      },
    }),
    // Registers passport with default strategy being jwt
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [
    // It exports passport module after being configured
    // and jwtStrategy, to be used by others
    PassportModule,
    JwtStrategy,
  ],
})
export class AuthModule {}
