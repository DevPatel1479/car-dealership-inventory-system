import type {
  IUserRepository,
  RegisterUserInput,
  UserResponse,
} from "../types/auth.types.js";

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

  async register(
    userData: RegisterUserInput
  ): Promise<UserResponse> {
    return this.userRepository.create(userData);
  }
}