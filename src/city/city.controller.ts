import { Controller, Delete, HttpException, Param, Put } from '@nestjs/common';
import { CityService } from './city.service';
import { Get, Query, Post, Body } from '@nestjs/common';
import { CreateCityDto } from './DTO/create.city.dto';
import { FindCityDTO } from './DTO/findCity.dto';
import { UpdateCityDto } from './DTO/update.city.dto';

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

  @Get('/:id')
  getCityById(@Param('id') id: string) {
    return this.cityService.getCityById(id);
  }

  @Put('/:id')
  updateCity(@Param('id') id: string, @Body() updateCityDTO: UpdateCityDto) {
    return this.cityService.updateCityById(id, updateCityDTO);
  }

  @Delete('/:id')
  deleteCity(@Param('id') id: string) {
    return this.cityService.deleteCityById(id);
  }
}
