import { Module } from '@nestjs/common';
import { MillService } from './mill.service';
import { MillController } from './mill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/schemas';

@Module({
  controllers: [MillController],
  providers: [MillService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class MillModule {}
