import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUserDTO {
  @ApiProperty({
    example: 'user1@example.com',
    description: 'The email of the user',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'eyJhbGciOiJSUzI1NiIsInR5',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    example: 'jack',
    description: 'The username of the user',
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;
}
