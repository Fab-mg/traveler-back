import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './city.entity';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import { CreateCityDto } from './DTO/create.city.dto';

@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private cityModel: Model<City>) {}

  async findAll(): Promise<City[]> {
    return await this.cityModel.find().exec();
  }

  async findByPostalCode(postal_code: number): Promise<City[]> {
    return await this.cityModel.find({ postal_code }).exec();
  }

  async registerCity(city: CreateCityDto): Promise<City> {
    const cityRegistered = await this.findByPostalCode(city.postal_code);
    if (cityRegistered && cityRegistered.length > 0) {
      throw new HttpException('City already registered', 400);
    }
    const newCity = await this.cityModel.create(city);
    return await newCity.save();
  }
}
