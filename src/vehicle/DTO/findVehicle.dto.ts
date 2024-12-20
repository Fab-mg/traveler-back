import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { PaginationClass } from 'src/helpers/classes/pagination.class.dto';

export class FindVehicleDTO extends PaginationClass {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  model?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  number?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  max_capacity?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  max_load?: number;
}
