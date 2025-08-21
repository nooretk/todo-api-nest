import { Status } from '../enums/todo-status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Todo {
  @ApiProperty({
    description: 'Unique identifier for the todo item',
    example: 1,
  })
  public id: number;

  @ApiProperty({
    description: 'Title of the todo item',
    example: 'Complete the project documentation',
  })
  public title: string;

  @ApiProperty({
    description: 'Date when the todo item was created',
    example: '2025-08-17T10:00:00.000Z',
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'Current status of the todo item',
    enum: Status,
    example: Status.PENDING,
  })
  public status: Status;

  @ApiPropertyOptional({
    description: 'Date when the todo item was marked as in progress',
    example: '2025-08-17T11:00:00.000Z',
  })
  public inProgressAt?: Date;

  @ApiPropertyOptional({
    description: 'Date when the todo item was completed',
    example: '2025-08-17T12:00:00.000Z',
  })
  public completedAt?: Date;

  constructor(
    id: number,
    title: string,
    createdAt: Date = new Date(),
    status: Status = Status.PENDING,
    inProgressAt?: Date, // set when status changes to IN_PROGRESS
    completedAt?: Date, // set when status changes to COMPLETED
  ) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.status = status;
    this.inProgressAt = inProgressAt;
    this.completedAt = completedAt;
  }
}
