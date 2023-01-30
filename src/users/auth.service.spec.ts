import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (phone: string) => {
        const filteredUsers = users.filter((user) => user.phone === phone);
        return Promise.resolve(filteredUsers);
      },
      create: (phone: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          phone,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with a salted and hashed password', async () => {
    const user = await service.signup('87073816081', 'qwerty');

    expect(user.password).not.toEqual('qwerty');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with phone that is in use', async () => {
    await service.signup('87073816081', 'qwerty');
    await expect(service.signup('87073816081', 'qwerty')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unused phone', async () => {
    await expect(service.signin('87073816081', 'asdf')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('87073816081', 'password');
    await expect(service.signin('87073816081', 'laksdlfkj')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('87073816081', 'mypassword');

    const user = await service.signin('87073816081', 'mypassword');
    expect(user).toBeDefined();
  });
});
