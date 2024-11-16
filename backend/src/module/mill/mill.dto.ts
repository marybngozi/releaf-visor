import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  IsNotEmpty,
  IsPositive,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class MillDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(24, 24)
  id: string;

  @IsString()
  millName: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(-180)
  @Max(180)
  longitude: number;

  @Transform(({ value }) => Math.round(parseFloat(value) * 100) / 100)
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'The Capacity must be a valid number.' },
  )
  @IsPositive({ message: 'The Capacity must be greater than 0.' })
  p1Amount: number;

  @IsOptional()
  @Transform(({ value }) => Math.round(parseFloat(value) * 100) / 100)
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'numTransactions must be a valid number.' },
  )
  numTransactions: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Average price (p1PriceTon)  must be a valid number.' },
  )
  p1PriceTon?: number;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : value))
  lastTransactionDate?: Date;
}

export class QueryMillDto {
  @IsOptional()
  page: number;

  @IsOptional()
  pageSize: number;
}
