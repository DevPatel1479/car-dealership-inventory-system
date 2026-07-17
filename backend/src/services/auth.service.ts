import type {
  IUserRepository,
  RegisterUserInput,
  UserResponse,
} from '../types/auth.types.js';
import { PasswordService } from './password.service.js';

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService = new PasswordService(),
  ) {}

  async register(userData: RegisterUserInput): Promise<UserResponse> {
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.passwordService.hash(userData.password);
    const user = await this.userRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    return {
      name: user.name,
      email: user.email,
    };
  }
}
