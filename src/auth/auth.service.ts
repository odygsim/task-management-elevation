import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const username = await this.userRepository.validateCredentials(
      authCredentialsDto,
    );

    if (!username) throw new UnauthorizedException('Invalid credentials');
  }
}
