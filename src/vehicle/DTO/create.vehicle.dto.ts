import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateVehicleDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  model?: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  max_capacity?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  max_load?: number;
}
