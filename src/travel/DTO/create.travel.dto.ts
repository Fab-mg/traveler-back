import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min, IsDate } from 'class-validator';
import { City } from 'src/city/city.entity';

export class CreateTravelDto {
  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Travel start date',
  })
  @IsDate()
  startDate: Date;

  @ApiProperty({
    example: '2023-01-02T00:00:00.000Z',
    description: 'Planned Travel end date',
  })
  @IsOptional()
  @IsDate()
  plannedEndDate?: Date;

  @ApiProperty({
    example: '2023-01-02T00:00:00.000Z',
    description: 'Travel end date',
  })
  @IsDate()
  endDate: Date;

  @ApiProperty({
    example: 'This is a first class travel',
    description: 'Travel description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: {
      _id: '676859430413e1042836931b',
      name: 'ANTANANARIVO',
      postal_code: 105,
      region: 'ANALAMANGA',
      country: 'Madagascar',
      continent: 'Africa',
      __v: 0,
    },
    description: 'City of departure',
  })
  departCity: City;

  @ApiProperty({
    example: {
      _id: '6774094105d653cd0557efea',
      name: 'AMBOSITRA',
      postal_code: 101,
      region: "AMORON'I MANIA",
      country: 'Madagascar',
      continent: 'Africa',
      __v: 0,
    },
    description: 'City of arrival',
  })
  arrivalCity: City;

  @ApiProperty({
    example: 10,
    description: 'Number of places',
  })
  @IsNumber()
  @Min(1)
  placeNumbers: number;

  @ApiProperty({
    example: 20000,
    description: 'Base travel place price',
  })
  @IsNumber()
  @Min(0)
  basePlacePrice: number;
}
