import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsPhoneNumber('KZ')
  phone?: string;
}
