import { Controller, HttpException } from '@nestjs/common';
import { CityService } from './city.service';
import { Get, Query, Post, Body } from '@nestjs/common';
import { CreateCityDto } from './DTO/create.city.dto';
import { FindCityDTO } from './DTO/findCity.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  @Get('/')
  getAllCity(
    @Query('pageSize') pageSize?: number,
    @Query('pageNumber') pageNumber?: number,
  ) {
    return this.cityService.findAll({ pageSize, pageNumber });
  }

  @Post('/')
  registerCity(@Body() createCityDTO: CreateCityDto) {
    try {
      return this.cityService.registerCity(createCityDTO);
    } catch (error) {
      throw new HttpException('Error registering city', 400);
    }
  }

  @Post('/find')
  findCity(
    @Body() findCityDTO: FindCityDTO,
    @Query('pageSize') pageSize?: number,
    @Query('pageNumber') pageNumber?: number,
  ) {
    return this.cityService.findByQuery({
      ...findCityDTO,
      pageSize,
      pageNumber,
    });
  }
}
