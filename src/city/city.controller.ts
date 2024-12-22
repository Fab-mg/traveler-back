import { Controller, Delete, HttpException, Param, Put } from '@nestjs/common';
import { CityService } from './city.service';
import { Get, Query, Post, Body } from '@nestjs/common';
import { CreateCityDto } from './DTO/create.city.dto';
import { FindCityDTO } from './DTO/findCity.dto';
import { UpdateCityDto } from './DTO/update.city.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiOperation({
    summary: 'Get all cities.',
  })
  @Get('/')
  getAllCity(
    @Query('pageSize') pageSize?: number,
    @Query('pageNumber') pageNumber?: number,
  ) {
    return this.cityService.findAll({ pageSize, pageNumber });
  }

  @ApiOperation({
    summary: 'Register new city. Verified by postal code.',
  })
  @Post('/')
  registerCity(@Body() createCityDTO: CreateCityDto) {
    try {
      return this.cityService.registerCity(createCityDTO);
    } catch (error) {
      throw new HttpException('Error registering city', 400);
    }
  }

  @ApiOperation({
    summary: 'Find city by body query.',
  })
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

  @ApiOperation({
    summary: 'Get city by ID.',
  })
  @Get('/:id')
  getCityById(@Param('id') id: string) {
    return this.cityService.getCityById(id);
  }

  @ApiOperation({
    summary: 'Edit city by ID.',
  })
  @Put('/:id')
  updateCity(@Param('id') id: string, @Body() updateCityDTO: UpdateCityDto) {
    return this.cityService.updateCityById(id, updateCityDTO);
  }

  @ApiOperation({
    summary: 'True delete: remove city from DB.',
  })
  @Delete('/:id')
  deleteCity(@Param('id') id: string) {
    return this.cityService.deleteCityById(id);
  }
}
