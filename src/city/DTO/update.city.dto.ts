import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateCityDto {
  @ApiProperty({ example: 'ANTANANARIVO', description: 'City name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 105, description: 'City postal CODE' })
  @IsOptional()
  @IsInt()
  @Min(1000)
  postal_code?: number;

  @ApiProperty({ example: 'ANALAMANGA', description: 'City Region' })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiProperty({
    example: 'Madagascar',
    description: 'Country in which the city belongs',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    example: 'Africa',
    description: 'Continent in which the city belongs',
  })
  @IsOptional()
  @IsString()
  continent?: string;
}
