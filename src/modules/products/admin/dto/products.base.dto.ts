import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductBaseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  quantity: number;

  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  colors: string[];

  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  sizes: string[];

  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  skin: string[];

  @IsString()
  @IsNotEmpty()
  type: string;
}
