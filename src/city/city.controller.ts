import { Controller, HttpException } from '@nestjs/common';
import { CityService } from './city.service';
import { Get, Query, Post, Body } from '@nestjs/common';
import { CreateCityDto } from './DTO/create.city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  @Get('/')
  getAllCity(@Query('keyword') keyword?: string) {
    if (!keyword) {
      return this.cityService.findAll();
    }
    // return this.cityService.getCityByNameOrCode(keyword)
  }

  @Post('/')
  registerCity(@Body() createCityDTO: CreateCityDto) {
    try {
      return this.cityService.registerCity(createCityDTO);
    } catch (error) {
      throw new HttpException('Error registering city', 400);
    }
  }
}
