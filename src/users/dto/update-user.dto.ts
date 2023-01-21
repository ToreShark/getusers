import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsPhoneNumber('KZ')
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  password: string;
}
