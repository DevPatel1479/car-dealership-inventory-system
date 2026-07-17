import type {
  IUserRepository,
  RegisterUserInput,
  UserResponse,
} from '../types/auth.types.js';

export class UserRepository implements IUserRepository {
  async create(userData: RegisterUserInput): Promise<UserResponse> {
    return {
      name: userData.name,
      email: userData.email,
    };
  }

  async findByEmail(email: string): Promise<UserResponse | null> {
      return null;
  }

}
