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
    try {
      const user = await UserModel.create(userData);

      return {
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('User already exists');
      }

      throw error;
    }
  }

  async findByEmail(email: string): Promise<AuthUserRecord | null> {
    const user = await UserModel.findOne({
      email,
    }).lean();

    if (!user) {
      return null;
    }

    return {
      id : user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    };
  }
}
