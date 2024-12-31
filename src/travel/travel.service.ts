import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Travel } from './travel.entity';
import { Model } from 'mongoose';
import { CreateTravelDto } from './DTO/create.travel.dto';
import { CityService } from 'src/city/city.service';
import { City } from 'src/city/city.entity';
import { PlaceService } from 'src/place/place.service';

@Injectable()
export class TravelService {
  constructor(
    @InjectModel(Travel.name) private travelModel: Model<Travel>,
    private readonly cityService: CityService,
    private readonly placeService: PlaceService,
  ) {}

  async findAll(): Promise<Travel[]> {
    return await this.travelModel.find().exec();
  }

  async createTravel(createTravelDTO: CreateTravelDto): Promise<Travel> {
    try {
      let departCity: City, arrivalCity: City;
      if (createTravelDTO.departCity && createTravelDTO.arrivalCity) {
        departCity = await this.cityService.getCityById(
          createTravelDTO.departCity._id.toString(),
        );
        arrivalCity = await this.cityService.getCityById(
          createTravelDTO.arrivalCity._id.toString(),
        );
        if (!departCity || !arrivalCity) {
          throw new HttpException(
            'INvalid: Departure or arrival city not found',
            400,
          );
        }
      }
      const newTravel = new this.travelModel({
        ...createTravelDTO,
        arrivalCity,
        departCity,
      });
      const travelPlaces = await this.placeService.generatePlacesForTravel(
        newTravel,
        createTravelDTO.basePlacePrice,
      );
      newTravel.places = travelPlaces;
      return await newTravel.save();
    } catch (error) {
      throw new HttpException(
        error.message + ' : failed to create travel',
        500,
      );
    }
  }
}
