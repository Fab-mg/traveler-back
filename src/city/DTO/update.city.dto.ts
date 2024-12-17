import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateCityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1000)
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
