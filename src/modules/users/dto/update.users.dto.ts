import { IsOptional, IsString, IsNumber } from 'class-validator';

export class ClientUsersUpdateDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsNumber()
  phone?: number;

  @IsOptional()
  @IsNumber()
  lada?: number;

  @IsOptional()
  @IsString()
  currency?: string;
}

export class ClientUserUpdateLocationDto {
  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsNumber()
  zipCode?: number;

  @IsOptional()
  @IsString()
  cologne?: string;

  @IsOptional()
  @IsString()
  municipality?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
