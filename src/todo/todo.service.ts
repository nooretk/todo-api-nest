import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { Status } from './enums/todo-status.enum';

@Injectable()
export class TodoService {
  private readonly todos: Todo[] = [];
  private idSeq = 1;

  create(createTodoDto: CreateTodoDto): Todo {
    const todo = new Todo(this.idSeq++, createTodoDto.title);
    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id: ${id} is not found`);
    return todo;
  }

  updateTitle(id: number, title: string): Todo {
    const todo = this.findOne(id);
    if (!title.trim()) throw new BadRequestException('Title cannot be empty');
    todo.title = title.trim();
    return todo;
  }

  markInProgress(id: number): Todo {
    const todo = this.findOne(id);
    if (todo.status === Status.COMPLETED) {
      throw new BadRequestException(
        'Cannot move from Completed to in progress status',
      );
    }
    if (todo.status !== Status.IN_PROGRESS) {
      todo.status = Status.IN_PROGRESS;
      todo.inProgressAt = new Date();
    }
    return todo;
  }

  markCompleted(id: number): Todo {
    const todo = this.findOne(id);
    if (todo.status !== Status.COMPLETED) {
      todo.status = Status.COMPLETED;
      todo.completedAt = new Date();
    }
    return todo;
  }

  remove(id: number): Todo {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    const [deleted] = this.todos.splice(index, 1);
    return deleted;
  }
}
