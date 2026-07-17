export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  name: string;
  email: string;
}

export interface IUserRepository {
  findByEmail(
    email : string
  ) : Promise<UserResponse | null>;

  create(userData: RegisterUserInput): Promise<UserResponse>;
  
}
