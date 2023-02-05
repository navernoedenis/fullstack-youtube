import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class VideoCommentDto {
  @ApiProperty({
    default: 'Video comment',
    example: 'Test comment.....',
    minimum: 1,
    maximum: 300,
    type: String,
  })
  @IsNotEmpty()
  @Length(1, 300)
  message: string;
}
