import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AccessTokenDto } from './dto/access-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<AccessTokenDto> {
    const username = await this.userRepository.validateCredentials(
      authCredentialsDto,
    );

    if (!username) throw new UnauthorizedException('Invalid credentials');

    const jwtPayload: JwtPayload = { username };

    const accessToken: string = this.jwtService.sign(jwtPayload);

    return { accessToken };
  }
}
