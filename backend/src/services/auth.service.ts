import type {
  RegisterUserInput,
  UserResponse,
} from "../types/auth.types.js";

import { UserRepository } from "../repositories/user.repository.js";

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async register(
    userData: RegisterUserInput
  ): Promise<UserResponse> {
    return this.userRepository.create(userData);
  }
}