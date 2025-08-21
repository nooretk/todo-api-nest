import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { Status } from './enums/todo-status.enum';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>,
  ) {}

  // CREATE
  async create(dto: CreateTodoDto): Promise<Todo> {
    const todo = this.repo.create({
      title: dto.title,
      status: Status.PENDING,
      // createdAt is auto via @CreateDateColumn
    });
    return this.repo.save(todo);
  }

  // READ ALL
  async findAll(): Promise<Todo[]> {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  // READ ONE (helper + public)
  private async mustFind(id: number): Promise<Todo> {
    const todo = await this.repo.findOne({ where: { id } });
    if (!todo) throw new NotFoundException(`Todo ${id} not found`);
    return todo;
  }

  async findOne(id: number): Promise<Todo> {
    return this.mustFind(id);
  }

  // UPDATE TITLE
  async updateTitle(id: number, title: string): Promise<Todo> {
    const todo = await this.mustFind(id);
    todo.title = title;
    return this.repo.save(todo);
  }

  // MARK IN PROGRESS
  async markInProgress(id: number): Promise<Todo> {
    const todo = await this.mustFind(id);
    if (todo.status !== Status.IN_PROGRESS) {
      todo.status = Status.IN_PROGRESS;
      if (!todo.inProgressAt) {
        // makes sure you only set the timestamp once
        todo.inProgressAt = new Date();
      }
    }
    return this.repo.save(todo);
  }

  // MARK COMPLETED
  async markCompleted(id: number): Promise<Todo> {
    const todo = await this.mustFind(id);
    if (todo.status !== Status.COMPLETED) {
      todo.status = Status.COMPLETED;
      if (!todo.completedAt) {
        todo.completedAt = new Date();
      }
    }
    return this.repo.save(todo);
  }

  // DELETE
  async remove(id: number): Promise<Todo> {
    const todo = await this.mustFind(id);
    await this.repo.remove(todo);
    return todo;
  }
}
