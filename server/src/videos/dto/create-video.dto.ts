import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';

export class CreateVideoDto {
  @ApiProperty({
    type: String,
    example: 'Wheel - Crank',
    minimum: 5,
    maximum: 120,
  })
  @IsString()
  @MinLength(5)
  title: string;

  @ApiProperty({
    type: String,
    example: 'One of the most underrated bands of all time.',
    minimum: 10,
    maximum: 500,
  })
  @IsOptional()
  @IsString()
  @Length(10, 200)
  description?: string;

  @ApiProperty({
    type: String,
    description: 'Video url',
    example: 'http://free-video.com/43uf43.mp4',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    type: String,
    description: 'Video thumbnail',
    example: 'http://free-image.com/43uf43.jpg',
  })
  @IsUrl()
  thumbnail: string;
}
