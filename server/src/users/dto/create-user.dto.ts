import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'denis@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    minimum: 8,
    maximum: 30,
    example: 'password2023',
  })
  @Length(8, 30)
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Unique username',
    example: 'denis',
    type: String,
    minimum: 3,
  })
  @MinLength(3)
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    example: 'https://some-image-url.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @ApiProperty({
    type: String,
    example: 'https://some-cover-image-url.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  cover?: string;

  @ApiProperty({
    type: String,
    example: 'Fullstack Developer with 5 year of experience',
    minimum: 10,
    required: false,
  })
  @IsOptional()
  @MinLength(10)
  @IsString()
  bio?: string;
}
