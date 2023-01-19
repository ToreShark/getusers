import { IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsPhoneNumber('KZ')
  phone: string;

  @IsString()
  password: string;
}
