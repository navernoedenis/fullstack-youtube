import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'newEmail2023@gmail.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    minimum: 8,
    maximum: 30,
    example: 'password2023',
    required: false,
  })
  @IsOptional()
  @Length(8, 30)
  @IsString()
  password?: string;

  @ApiProperty({
    type: String,
    minimum: 8,
    maximum: 30,
    example: 'superPassword2023',
    required: false,
  })
  @IsOptional()
  @Length(8, 30)
  @IsString()
  newPassword?: string;

  @ApiProperty({
    type: String,
    description: 'Unique username',
    example: 'denis',
    minimum: 3,
    required: false,
  })
  @IsOptional()
  @MinLength(3)
  @IsString()
  username?: string;

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
