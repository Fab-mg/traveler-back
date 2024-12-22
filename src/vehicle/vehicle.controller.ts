import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './DTO/create.vehicle.dto';
import { FindVehicleDTO } from './DTO/findVehicle.dto';
import { UpdateVehicleDto } from './DTO/update.vehicle.dto copy';
import { ApiOperation } from '@nestjs/swagger';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOperation({
    summary: 'Get all vehicles, including the deleted (deactivated) ones.',
  })
  @Get('/')
  getAllVehicles(
    @Query('pageSize') pageSize?: number,
    @Query('pageNumber') pageNumber?: number,
  ) {
    return this.vehicleService.findAll({ pageSize, pageNumber });
  }

  @ApiOperation({
    summary:
      'Get all deleted vehicles: only the deactivated vehicles will be returned.',
  })
  @Get('deleted/')
  getAllDeletedVehicles(
    @Query('pageSize') pageSize?: number,
    @Query('pageNumber') pageNumber?: number,
  ) {
    return this.vehicleService.findAllDeleted({ pageSize, pageNumber });
  }

  @ApiOperation({
    summary:
      'Get all non-deleted vehicles, Only the activated vehicles will be shown.',
  })
  @Get('non-deleted/')
  getAllNonDeletedVehicles(
    @Query('pageSize') pageSize?: number,
    @Query('pageNumber') pageNumber?: number,
  ) {
    return this.vehicleService.findAllNonDeleted({ pageSize, pageNumber });
  }

  @ApiOperation({
    summary: 'Register a new vehicle.',
  })
  @Post('/')
  registerVehicle(@Body() createVehicleDTO: CreateVehicleDto) {
    try {
      return this.vehicleService.registerVehicle(createVehicleDTO);
    } catch (error) {
      throw new HttpException('Error registering vehicle', 400);
    }
  }

  @ApiOperation({
    summary:
      'Find a vehicle from all the vehicles. (Includes the deactivated vehicles).',
  })
  @Post('/find')
  findVehicle(
    @Body() findVehicleDTO: FindVehicleDTO,
    @Query('pageSize') pageSize?: number,
    @Query('pageNumber') pageNumber?: number,
  ) {
    return this.vehicleService.findByQuery({
      ...findVehicleDTO,
      pageSize,
      pageNumber,
    });
  }

  @ApiOperation({
    summary:
      'Find a vehicle from all active the vehicles. (Does not includes the deactivated vehicles).',
  })
  @Post('/find-non-deleted')
  findVehicleNonDeleted(
    @Body() findVehicleDTO: FindVehicleDTO,
    @Query('pageSize') pageSize?: number,
    @Query('pageNumber') pageNumber?: number,
  ) {
    return this.vehicleService.findByQueryNonDeleted({
      ...findVehicleDTO,
      pageSize,
      pageNumber,
    });
  }

  @ApiOperation({
    summary: 'Get vehicle by ID.',
  })
  @Get('/:id')
  getVehicleById(@Param('id') id: string) {
    return this.vehicleService.getVehicleById(id);
  }

  @ApiOperation({
    summary:
      'Update vehicle by ID. !! Does not work on deactivated vehicles !!',
  })
  @Put('/:id')
  updateVehicle(
    @Param('id') id: string,
    @Body() updateVehicleDTO: UpdateVehicleDto,
  ) {
    return this.vehicleService.updateVehicleById(id, updateVehicleDTO);
  }

  @ApiOperation({
    summary: 'Deactivate a vehicle.',
  })
  @Delete('/:id')
  deleteVehicle(@Param('id') id: string) {
    return this.vehicleService.deleteVehicleById(id);
  }

  @ApiOperation({
    summary: 'Reactivate a vehicle.',
  })
  @Put('reactivate/:id')
  reactivateVehicle(@Param('id') id: string) {
    return this.vehicleService.reactivateVehicleById(id);
  }
  @ApiOperation({
    summary: 'True delete : remove the vehicle from DB.',
  })
  @Delete('true-delete/:id')
  trueDeleteVehicle(@Param('id') id: string) {
    return this.vehicleService.trueDeleteVehicleById(id);
  }
}
