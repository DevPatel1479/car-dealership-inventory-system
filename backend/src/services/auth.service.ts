import type {
  IUserRepository,
  RegisterUserInput,
  UserResponse,
} from '../types/auth.types.js';
import { PasswordService } from './password.service.js';

import { registrationSchema } from '../validators/registration.validator.js';

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService = new PasswordService(),
  ) {}

  async register(userData: RegisterUserInput): Promise<UserResponse> {
    const validationResult = registrationSchema.safeParse(userData);
    
    if (!validationResult.success) {
      throw new Error(
        validationResult.error.issues.at(0)?.message ??
          'Invalid registration details',
      );
    }

    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.passwordService.hash(userData.password);

    const createdUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.toUserResponse(createdUser);
  }
  private toUserResponse(user: { name: string; email: string }): UserResponse {
    return {
      name: user.name,
      email: user.email,
    };
  }
}
