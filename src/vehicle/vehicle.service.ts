import { HttpException, Injectable } from '@nestjs/common';
import { Vehicle } from './vehicle.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationClass } from 'src/helpers/classes/pagination.class.dto';
import { PaginatedResult } from 'src/helpers/classes/paginatedResutls.class';
import { getPagination } from 'src/helpers/classes/pagination.functions';
import { CreateVehicleDto } from './DTO/create.vehicle.dto';
import { FindVehicleDTO } from './DTO/findVehicle.dto';
import { convertStringToObjectId } from 'src/helpers/helper.functions';
import { UpdateVehicleDto } from './DTO/update.vehicle.dto copy';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
  ) {}

  async findAll(
    paginationDTO?: PaginationClass,
  ): Promise<PaginatedResult<Vehicle>> {
    const pagination = getPagination(
      paginationDTO ? paginationDTO : new PaginationClass(),
    );
    const totalResults = await this.vehicleModel.countDocuments();
    const maxPage = Math.ceil(totalResults / pagination.pageSize);
    const results = await this.vehicleModel
      .find()
      .limit(pagination.pageSize)
      .skip(pagination.pageSize * (pagination.pageNumber - 1))
      .exec();
    return new PaginatedResult(results, totalResults, maxPage);
  }

  async findByQuery(
    findVehicleDTO?: FindVehicleDTO,
  ): Promise<PaginatedResult<Vehicle>> {
    if (findVehicleDTO) {
      const { pageNumber, pageSize, ...query } = findVehicleDTO;
      const pagination = getPagination({ pageNumber, pageSize });
      const totalResults = await this.vehicleModel.countDocuments(query);
      const maxPage = Math.ceil(totalResults / pagination.pageSize);
      const results = await this.vehicleModel
        .find({ ...query })
        .limit(pagination.pageSize)
        .skip(pagination.pageSize * (pagination.pageNumber - 1))
        .exec();
      return new PaginatedResult(results, totalResults, maxPage);
    } else {
      throw new HttpException('Bad request: Empty Query', 400);
    }
  }

  async registerVehicle(createVehicleDTO: CreateVehicleDto): Promise<Vehicle> {
    const vehicleRegistered = await this.findByQuery({
      number: createVehicleDTO.number,
    });
    if (vehicleRegistered && vehicleRegistered.items.length > 0) {
      throw new HttpException('Vehicle already registered', 400);
    }
    const newVehicle = new this.vehicleModel(createVehicleDTO);
    return await newVehicle.save();
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    if (!id) {
      throw new HttpException(
        'Bad request: Empty ID in getVehicleById service',
        400,
      );
    }
    if (id.length != 24) {
      throw new HttpException(
        'Bad request: Invalid ID in getVehicleById service',
        400,
      );
    }
    const finalId = convertStringToObjectId(id);
    return await this.vehicleModel.findById(finalId);
  }

  async updateVehicleById(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    if (!id) {
      throw new HttpException(
        'Bad request: Empty ID in updateVehicleById service',
        400,
      );
    }
    if (id.length != 24) {
      throw new HttpException(
        'Bad request: Invalid ID in updateVehicleById service',
        400,
      );
    }
    const vehicle = await this.getVehicleById(id);
    if (!vehicle) {
      throw new HttpException('Vehicle not found', 404);
    }
    const finalId = convertStringToObjectId(id);
    let updated = await this.vehicleModel
      .findByIdAndUpdate(finalId, updateVehicleDto)
      .exec();
    console.log('🚀 ~ VehicleService ~ updateVehicleById ~ updated:', updated);
    if (!updated) {
      throw new HttpException('Update failed', 400);
    }
    return { ...updated, ...updateVehicleDto };
  }

  async deleteVehicleById(id: string): Promise<Vehicle> {
    if (!id) {
      throw new HttpException(
        'Bad request: Empty ID in deleteVehicleById service',
        400,
      );
    }
    if (id.length != 24) {
      throw new HttpException(
        'Bad request: Invalid ID in deleteVehicleById service',
        400,
      );
    }
    const vehicle = await this.getVehicleById(id);
    if (!vehicle) {
      throw new HttpException(
        'Vehicle not found, it may have already been deleted',
        404,
      );
    }
    const finalId = convertStringToObjectId(id);
    const deleted = await this.vehicleModel.findByIdAndDelete(finalId).exec();
    if (!deleted) {
      throw new HttpException('Delete failed', 400);
    }
    return deleted;
  }
}
