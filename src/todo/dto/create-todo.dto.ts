import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo item',
    example: 'Complete the project documentation',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
