import type {
  IUserRepository,
  LoginInput,
  LoginResponse,
  RegisterUserInput,
  UserResponse,
  UserRole,
} from '../types/auth.types.js';
import { PasswordService } from './password.service.js';

import { registrationSchema } from '../validators/registration.validator.js';

import { JwtService } from './jwt.service.js';

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService = new PasswordService(),
    private readonly jwtService = new JwtService(),
  ) {}

  async register(userData: RegisterUserInput): Promise<UserResponse> {
    const validationResult = registrationSchema.safeParse(userData);

    if (!validationResult.success) {
      const firstIssue = validationResult.error.issues.at(0);

      if (firstIssue?.path[0] === 'name') {
        throw new Error('Name is required');
      }

      throw new Error(firstIssue?.message ?? 'Invalid registration details');
    }

    const normalizedUserData = this.normalizeRegistrationData(
      validationResult.data,
    );

    const existingUser = await this.userRepository.findByEmail(
      normalizedUserData.email,
    );

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.passwordService.hash(
      normalizedUserData.password,
    );

    const createdUser = await this.userRepository.create({
      ...normalizedUserData,
      password: hashedPassword,
      role: this.getDefaultUserRole(),
    });

    return this.toUserResponse(createdUser);
  }
  async login(loginData: LoginInput): Promise<LoginResponse> {
    const normalizedEmail = loginData.email.trim().toLowerCase();

    const user = await this.userRepository.findByEmail(normalizedEmail);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.compare(
      loginData.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.generateToken({
      sub: user.email,
      role: user.role,
    });

    return {
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  }
  private getDefaultUserRole(): UserRole {
    return 'USER';
  }

  // Returns only the fields that are safe to expose in the API response.

  private toUserResponse(user: UserResponse): UserResponse {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
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
