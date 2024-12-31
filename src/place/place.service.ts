import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place } from './place.entity';
import { Travel } from 'src/travel/travel.entity';

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

  async generatePlacesForTravel(travel: Travel) {
    try {
      if (!travel) {
        throw new Error('Travel must be provided in create places');
      }
      if (travel.placeNumbers && travel.placeNumbers >= 0) {
        const places = [];
        for (let i = 0; i < travel.placeNumbers; i++) {
          const newPlace = new this.placeModel();
          newPlace.travel = travel;
          places.push(newPlace);
        }
        await this.placeModel.insertMany(places);
        return places;
      } else {
        throw new Error('Travel place number should not be a negative number');
      }
    } catch (error) {
      throw new Error(error.message + ' : failed to create travel places');
    }
  }

  async updatePlace(id: string, place: Place): Promise<Place> {
    return await this.placeModel.findByIdAndUpdate(id, place).exec();
  }

  async reservePlace() {}

  async cancelPlaceReservation() {}

  // async deletePlace(id: string): Promise<Place> {
  //   return await this.placeModel.findByIdAndDelete(id).exec();
  // }
}
