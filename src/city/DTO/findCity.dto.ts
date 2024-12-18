import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationClass } from 'src/helpers/classes/pagination.class.dto';

export class FindCityDTO extends PaginationClass {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  postal_code?: number;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  continent?: string;
}
