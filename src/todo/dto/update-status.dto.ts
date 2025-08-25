import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '../enums/todo-status.enum';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'The new status for the todo item',
    enum: Status,
    example: Status.IN_PROGRESS,
  })
  @IsEnum(Status, { message: 'Status must be a valid status value' })
  @IsNotEmpty()
  status: Status;
}
