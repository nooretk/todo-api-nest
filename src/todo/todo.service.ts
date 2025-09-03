import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError, EntityNotFoundError } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { Status } from './enums/todo-status.enum';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
  ) {}

  /**
   * Handle database exceptions and convert them to appropriate HTTP exceptions
   */
  private handleDatabaseError(error: any, operation: string): never {
    // Handle TypeORM's EntityNotFoundError and convert to NotFoundException
    if (error instanceof EntityNotFoundError) {
      throw new NotFoundException(`Todo not found`);
    }

    if (error instanceof QueryFailedError) {
      // Handle specific database constraint violations
      if (error.message.includes('duplicate key value')) {
        throw new BadRequestException('Todo with this data already exists');
      }
      if (error.message.includes('violates check constraint')) {
        throw new BadRequestException('Invalid data provided');
      }
      if (error.message.includes('value too long')) {
        throw new BadRequestException('Title exceeds maximum length');
      }
    }

    // Handle connection and timeout errors
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const errorWithCode = error as { code: string };
      if (
        errorWithCode.code === 'ECONNREFUSED' ||
        errorWithCode.code === 'ETIMEDOUT'
      ) {
        throw new InternalServerErrorException('Database connection failed');
      }
    }

    // Default error for any other database issues
    throw new InternalServerErrorException(`Failed to ${operation}`);
  }

  // CREATE
  async create(dto: CreateTodoDto): Promise<Todo> {
    try {
      const todo = this.repo.create({
        title: dto.title,
        status: Status.PENDING,
        // createdAt is auto via @CreateDateColumn
      });
      return await this.repo.save(todo);
    } catch (error) {
      this.handleDatabaseError(error, 'create todo');
    }
  }

  // READ ALL
  async findAll(): Promise<Todo[]> {
    try {
      return await this.repo.find({ order: { id: 'DESC' } });
    } catch (error) {
      this.handleDatabaseError(error, 'fetch todos');
    }
  }

  async findOne(id: number): Promise<Todo> {
    try {
      return await this.repo.findOneOrFail({ where: { id } });
    } catch (error) {
      this.handleDatabaseError(error, 'find todo');
    }
  }

  // UPDATE TITLE
  async updateTitle(id: number, title: string): Promise<Todo> {
    try {
      const todo = await this.repo.findOneOrFail({ where: { id } });
      todo.title = title;
      return await this.repo.save(todo);
    } catch (error) {
      this.handleDatabaseError(error, 'update todo title');
    }
  }

  // UPDATE STATUS
  async updateStatus(id: number, status: Status): Promise<Todo> {
    try {
      const todo = await this.repo.findOneOrFail({ where: { id } });
      if (todo.status !== status) {
        todo.status = status;
        if (status === Status.IN_PROGRESS && !todo.inProgressAt) {
          todo.inProgressAt = new Date();
        } else if (status === Status.COMPLETED && !todo.completedAt) {
          todo.completedAt = new Date();
        }
        return await this.repo.save(todo);
      }
      return todo; // Return unchanged todo if status is the same
    } catch (error) {
      this.handleDatabaseError(error, 'update todo status');
    }
  }

  // DELETE
  async remove(id: number): Promise<Todo> {
    try {
      const todo = await this.repo.findOneOrFail({ where: { id } });
      await this.repo.remove(todo);
      return todo;
    } catch (error) {
      this.handleDatabaseError(error, 'delete todo');
    }
  }
}
