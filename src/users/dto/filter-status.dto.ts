import { Expose, Exclude } from 'class-transformer';
export class FilterDto {
  @Expose()
  id: number;

  @Expose()
  phone: string;
}
