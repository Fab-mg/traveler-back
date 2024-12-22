import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateVehicleDto {
  @ApiProperty({
    example: 'Car',
    description: 'Vehicle type (Truck, Van, Car, Byke, etc.)',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type?: string;

  @ApiProperty({
    example: 'Sprinter',
    description: 'Vehicle model (Sprinter, Mazda, Tata, 4x4, etc.)',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  model?: string;

  @ApiProperty({
    example: '7584FCE',
    description: 'Vehicle registration number',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  number?: string;

  @ApiProperty({
    example: 28,
    description: 'Maximum capacity of the vehicle',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  max_capacity?: number;

  @ApiProperty({
    example: 2500,
    description: 'Maximum load of the vehicle, in kilograms',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  max_load?: number;
}
