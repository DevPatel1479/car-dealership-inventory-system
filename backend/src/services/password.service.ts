import bcrypt from 'bcrypt';

export class PasswordService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
