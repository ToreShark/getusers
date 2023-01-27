import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(phone: string, password: string) {
    const users = await this.usersService.find(phone);
    if (users.length) {
      throw new BadRequestException('Phone in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(phone, result);

    return user;
  }

  async signin(phone: string, password: string) {
    const [user] = await this.usersService.find(phone);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
