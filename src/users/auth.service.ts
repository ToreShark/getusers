import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(phone: string, password: string) {
    const users = await this.usersService.find(phone);
    if (users.length) {
      throw new BadRequestException('Phone in use');
    }
  }

  signin(phone: string, password: string) {}
}
