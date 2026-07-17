import { describe, it, expect, jest } from "@jest/globals";
import { AuthService } from "../../../src/services/auth.service";

describe("AuthService - User Registration", () => {
  it("should create a new user account when valid registration details are provided", async () => {

    

    const userRepository = {
      create: jest.fn().mockResolvedValue({
        name: "John Do",
        email: "john@example.com",
      }),
    };

    const authService = new AuthService(userRepository);

    const user = await authService.register({
      name: "John Do",
      email: "john@example.com",
      password: "password123",
    });

    expect(user).toEqual({
      name: "John Do",
      email: "john@example.com",
    });

    expect(userRepository.create).toHaveBeenCalledWith({
      name: "John Do",
      email: "john@example.com",
      password: "password123",
    });
  });
});