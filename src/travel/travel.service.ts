import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Travel } from './travel.entity';
import { Model } from 'mongoose';

@Injectable()
export class TravelService {
  constructor(@InjectModel(Travel.name) private travelModel: Model<Travel>) {}
}
