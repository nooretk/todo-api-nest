import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private readonly todos: Todo[] = [];
  private idSeq = 1;

  create(createTodoDto: CreateTodoDto): Todo {
    const todo = new Todo(this.idSeq++, createTodoDto.text);
    this.todos.push(todo);
    return todo;
  }
}
