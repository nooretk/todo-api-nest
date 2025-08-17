import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTitleDto {
  @ApiProperty({
    description: 'The new title for the todo item',
    example: 'Updated project documentation',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
