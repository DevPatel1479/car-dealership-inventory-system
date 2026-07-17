import type {
  RegisterUserInput,
  UserResponse,
} from "../types/auth.types.js";

export class UserRepository {
  async create(
    userData: RegisterUserInput
  ): Promise<UserResponse> {
    return {
      name: userData.name,
      email: userData.email,
    };
  }
}