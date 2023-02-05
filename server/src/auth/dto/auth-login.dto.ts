import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    minimum: 8,
    maximum: 30,
    example: 'my1234567password',
  })
  @Length(8, 30)
  @IsString()
  password: string;
}
