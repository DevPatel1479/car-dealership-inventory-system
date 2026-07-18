import { describe, expect, it, jest } from '@jest/globals';

import { AuthController } from '../../../src/controllers/auth.controller.js';


describe('AuthController - Register', () => {

  it('should register a user and return created user', async () => {

    const authService = {
      register: jest.fn().mockResolvedValue({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'USER',
      }),
    };


    const controller =
      new AuthController(authService as any);


    const req:any = {
      body:{
        name:'John Doe',
        email:'john@example.com',
        password:'password123',
      }
    };


    const res:any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };


    await controller.register(req,res);


    expect(authService.register)
      .toHaveBeenCalledWith({
        name:'John Doe',
        email:'john@example.com',
        password:'password123',
      });


    expect(res.json)
      .toHaveBeenCalledWith({
        name:'John Doe',
        email:'john@example.com',
        role:'USER',
      });

  });

});