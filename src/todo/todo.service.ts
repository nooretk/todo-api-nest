import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

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
}
