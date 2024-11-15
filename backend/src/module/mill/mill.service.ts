import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MillDto, QueryMillDto } from './mill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mill, MillDocument } from 'src/schemas/mill.schema';

@Injectable()
export class MillService {
  constructor(
    @InjectModel(Mill.name) private readonly millModel: Model<MillDocument>,
  ) {}

  async createOrEditMill(payload: MillDto) {
    try {
      const { id, ...millOthers } = payload;

      if (id) {
        return this.millModel.findOneAndUpdate({ _id: id }, millOthers);
      }

      const mill = await this.millModel.findOne({ millName: payload.millName });

      if (mill) {
        throw new BadRequestException(
          'Mill Name already exists, please use another name',
        );
      }

      return this.millModel.create(payload);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async listMill(payload: QueryMillDto) {
    try {
      const { pageSize = 10, page = 1 } = payload;

      return this.millModel
        .find({})
        .limit(pageSize)
        .skip((page - 1) * pageSize);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
