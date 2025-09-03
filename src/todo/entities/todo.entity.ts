import { Status } from '../enums/todo-status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
  @ApiProperty({
    description: 'Unique identifier for the todo item',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title of the todo item',
    example: 'Complete the project documentation',
  })
  @Column({ length: 120 })
  @Index() // helpful for search/sorting
  title: string;

  @ApiProperty({
    description: 'Date when the todo item was created',
    example: '2025-08-17T10:00:00.000Z',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({
    description: 'Current status of the todo item',
    enum: Status,
    example: Status.PENDING,
  })
  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  @Index()
  status: Status;

  @ApiPropertyOptional({
    description: 'Date when the todo item was marked as in progress',
    example: '2025-08-17T11:00:00.000Z',
  })
  @Column({ type: 'timestamptz', nullable: true })
  inProgressAt?: Date | null;

  @ApiPropertyOptional({
    description: 'Date when the todo item was completed',
    example: '2025-08-17T12:00:00.000Z',
  })
  @Column({ type: 'timestamptz', nullable: true })
  completedAt?: Date | null;

  // Prefer no-arg constructor for TypeORM
}
