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
}
