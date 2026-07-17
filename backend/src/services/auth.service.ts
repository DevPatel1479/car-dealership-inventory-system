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
    // Normalize incoming values before validation and persistence.
    const normalizedUserData = this.normalizeRegistrationData(userData);

    const validationResult = registrationSchema.safeParse(normalizedUserData);

    if (!validationResult.success) {
      throw new Error(
        validationResult.error.issues.at(0)?.message ??
          'Invalid registration details',
      );
    }

    const existingUser = await this.userRepository.findByEmail(
      normalizedUserData.email,
    );

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Persist only the hashed password. Plain-text passwords must never be stored.
    const hashedPassword = await this.passwordService.hash(
      normalizedUserData.password,
    );

    const createdUser = await this.userRepository.create({
      ...normalizedUserData,
      password: hashedPassword,
    });

    return this.toUserResponse(createdUser);
  }

  // Returns only the fields that are safe to expose in the API response.

  private toUserResponse(user: { name: string; email: string }): UserResponse {
    return {
      name: user.name,
      email: user.email,
    };
  }

  // Removes leading and trailing whitespace from user-provided registration data.
  private normalizeRegistrationData(
    userData: RegisterUserInput,
  ): RegisterUserInput {
    return {
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password.trim(),
    };
  }
}
