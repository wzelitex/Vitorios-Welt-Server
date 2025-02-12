import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class SecurityAdminDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export class CreateAuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class CreateAuthSignupDto extends CreateAuthLoginDto {
  @IsString()
  @MinLength(1)
  username: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsNumber()
  @IsNotEmpty()
  lada: number;
}
