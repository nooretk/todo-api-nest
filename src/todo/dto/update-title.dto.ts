import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTitleDto {
  @ApiProperty({
    description: 'The new title for the todo item',
    example: 'Updated project documentation',
  })
  @Transform(
    ({ value }) => (typeof value === 'string' ? value.trim() : value) as string,
  )
  @IsString()
  @IsNotEmpty()
  title: string;
}
