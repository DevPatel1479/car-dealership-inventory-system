import type {
  IUserRepository,
  RegisterUserInput,
  UserResponse,
} from '../types/auth.types.js';

export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async register(userData: RegisterUserInput): Promise<UserResponse> {
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser){
        throw new Error("User already exists");
    }

    return this.userRepository.create(userData);
  }



}
