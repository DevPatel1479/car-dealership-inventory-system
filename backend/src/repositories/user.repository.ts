import { UserModel } from '../models/user.model.js';

import type {
  AuthUserRecord,
  IUserRepository,
  RegisterUserInput,
  UserResponse,
} from '../types/auth.types.js';

export class UserRepository implements IUserRepository {
  async create(
    userData: RegisterUserInput & { role: 'USER' | 'ADMIN' },
  ): Promise<UserResponse> {
    const user = await UserModel.create(userData);

    return {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async findByEmail(email: string): Promise<AuthUserRecord | null> {
    const user = await UserModel.findOne({
      email,
    }).lean();

    if (!user) {
      return null;
    }

    return {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    };
  }
}