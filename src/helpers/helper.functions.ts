import { HttpException } from '@nestjs/common';
import * as mongoose from 'mongoose';

const convertStringToObjectId = (id: string): mongoose.Types.ObjectId => {
  try {
    if (!id) {
      throw new HttpException('Bad request: empty id in transformation', 400);
    }
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    throw new HttpException('Bad request: error in transformation: ' + id, 400);
  }
};

export { convertStringToObjectId };
