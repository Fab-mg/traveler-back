import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationClass } from 'src/helpers/classes/pagination.class.dto';

export class FindCityDTO extends PaginationClass {
  @ApiProperty({ example: 'ANTANANARIVO', description: 'City name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 105, description: 'City postal CODE' })
  @IsOptional()
  @IsNumber()
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
