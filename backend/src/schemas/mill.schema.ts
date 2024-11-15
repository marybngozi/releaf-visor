import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MillDocument = HydratedDocument<Mill>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Mill {
  @Prop({ required: true, unique: true })
  millName: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  p1Amount: number;

  @Prop()
  numTransactions: number;

  @Prop()
  p1PriceTon: number;

  @Prop({ default: 'active' })
  status: string;

  @Prop()
  lastTransactionDate: string;
}

export const MillSchema = SchemaFactory.createForClass(Mill);
