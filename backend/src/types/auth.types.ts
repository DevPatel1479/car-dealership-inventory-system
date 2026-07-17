export type UserRole = 'USER' | 'ADMIN';

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  name: string;
  email: string;
  role: UserRole;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<UserResponse | null>;

  create(
    userData: RegisterUserInput & { role: UserRole },
  ): Promise<UserResponse>;
}
