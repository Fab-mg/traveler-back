import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './city.entity';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import { CreateCityDto } from './DTO/create.city.dto';
import { FindCityDTO } from './DTO/findCity.dto';
import { getPagination } from 'src/helpers/classes/pagination.functions';
import { PaginationClass } from 'src/helpers/classes/pagination.class.dto';
import { PaginatedResult } from 'src/helpers/classes/paginatedResutls.class';
import { convertStringToObjectId } from 'src/helpers/helper.functions';
import { UpdateCityDto } from './DTO/update.city.dto';

@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private cityModel: Model<City>) {}

  async findAll(
    paginationDTO?: PaginationClass,
  ): Promise<PaginatedResult<City>> {
    const pagination = getPagination(
      paginationDTO ? paginationDTO : new PaginationClass(),
    );
    const totalResults = await this.cityModel.countDocuments();
    const maxPage = Math.ceil(totalResults / pagination.pageSize);
    const results = await this.cityModel
      .find()
      .limit(pagination.pageSize)
      .skip(pagination.pageSize * (pagination.pageNumber - 1))
      .exec();
    return new PaginatedResult(results, totalResults, maxPage);
  }

  async findByQuery(findCityDTO?: FindCityDTO): Promise<PaginatedResult<City>> {
    if (findCityDTO) {
      const { pageNumber, pageSize, ...query } = findCityDTO;
      const pagination = getPagination({ pageNumber, pageSize });
      const totalResults = await this.cityModel.countDocuments(query);
      const maxPage = Math.ceil(totalResults / pagination.pageSize);
      const results = await this.cityModel
        .find({ ...query })
        .limit(pagination.pageSize)
        .skip(pagination.pageSize * (pagination.pageNumber - 1))
        .exec();
      return new PaginatedResult(results, totalResults, maxPage);
    } else {
      throw new HttpException('Bad request: Empty Query', 400);
    }
  }

  async registerCity(cityDTO: CreateCityDto): Promise<City> {
    const cityRegistered = await this.findByQuery({
      postal_code: Number(cityDTO.postal_code),
    });
    if (cityRegistered && cityRegistered.items.length > 0) {
      throw new HttpException('City already registered', 400);
    }
    const newCity = new this.cityModel(cityDTO);
    return await newCity.save();
  }

  async getCityById(id: string): Promise<City> {
    if (!id) {
      throw new HttpException(
        'Bad request: Empty ID in getCityById service',
        400,
      );
    }
    if (id.length != 24) {
      throw new HttpException(
        'Bad request: Invalid ID in getCityById service',
        400,
      );
    }
    const finalId = convertStringToObjectId(id);
    return await this.cityModel.findById(finalId);
  }

  async updateCityById(
    id: string,
    updateCityDto: UpdateCityDto,
  ): Promise<City> {
    if (!id) {
      throw new HttpException(
        'Bad request: Empty ID in updateCityById service',
        400,
      );
    }
    if (id.length != 24) {
      throw new HttpException(
        'Bad request: Invalid ID in updateCityById service',
        400,
      );
    }
    const city = await this.getCityById(id);
    if (!city) {
      throw new HttpException('City not found', 404);
    }
    const finalId = convertStringToObjectId(id);
    let updated = await this.cityModel
      .findByIdAndUpdate(finalId, updateCityDto)
      .exec();
    console.log('🚀 ~ CityService ~ updateCityById ~ updated:', updated);
    if (!updated) {
      throw new HttpException('Update failed', 400);
    }
    return { ...updated, ...updateCityDto };
  }

  async deleteCityById(id: string): Promise<City> {
    if (!id) {
      throw new HttpException(
        'Bad request: Empty ID in deleteCityById service',
        400,
      );
    }
    if (id.length != 24) {
      throw new HttpException(
        'Bad request: Invalid ID in deleteCityById service',
        400,
      );
    }
    const city = await this.getCityById(id);
    if (!city) {
      throw new HttpException(
        'City not found, it may have already been deleted',
        404,
      );
    }
    const finalId = convertStringToObjectId(id);
    const deleted = await this.cityModel.findByIdAndDelete(finalId).exec();
    if (!deleted) {
      throw new HttpException('Delete failed', 400);
    }
    return deleted;
  }
}
