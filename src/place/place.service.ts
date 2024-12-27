import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place } from './place.entity';

@Injectable()
export class PlaceService {
  constructor(@InjectModel(Place.name) private placeModel: Model<Place>) {}

  async findAll(): Promise<Place[]> {
    return await this.placeModel.find().exec();
  }

  async findPlaceById(id: string): Promise<Place> {
    return await this.placeModel.findById(id).exec();
  }

  async findAllUserTravelPlaces() {}

  async findPlaceByQuery() {}

  async createPlace(place: Place): Promise<Place> {
    const newPlace = new this.placeModel(place);
    return await newPlace.save();
  }

  async generateTravelPlaces() {}

  async updatePlace(id: string, place: Place): Promise<Place> {
    return await this.placeModel.findByIdAndUpdate(id, place).exec();
  }

  async reservePlace() {}

  async cancelPlaceReservation() {}

  // async deletePlace(id: string): Promise<Place> {
  //   return await this.placeModel.findByIdAndDelete(id).exec();
  // }
}
