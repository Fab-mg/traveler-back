import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { TravelService } from './travel.service';
import { CreateTravelDto } from './DTO/create.travel.dto';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Get('/')
  async getTravels() {
    return await this.travelService.findAll();
  }

  @Post('/')
  createTravel(@Body() createTravelDTO: CreateTravelDto) {
    try {
      return this.travelService.createTravel(createTravelDTO);
    } catch (error) {
      throw new HttpException('Error registering travel', 500);
    }
  }
}
