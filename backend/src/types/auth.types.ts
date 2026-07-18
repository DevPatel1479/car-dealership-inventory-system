export type UserRole = 'USER' | 'ADMIN';

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}


export interface AuthUserRecord {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}


export interface UserResponse {
  name: string;
  email: string;
  role: UserRole;
}


export interface LoginInput {
  email: string;
  password: string;
}


export interface LoginResponse extends UserResponse {
  token: string;
}


export interface AuthTokenPayload {
  sub: string;
  role: UserRole;
}


export interface IUserRepository {

  findByEmail(
    email: string,
  ): Promise<AuthUserRecord | null>;


  create(
    userData: AuthUserRecord,
  ): Promise<UserResponse>;

}