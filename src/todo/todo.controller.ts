import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { UpdateTitleDto } from './dto/update-title.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Patch(':id/title')
  updateTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTitleDto,
  ): Todo {
    return this.todoService.updateTitle(id, dto.title);
  }

  @Patch(':id/in-progress')
  markInProgress(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.markInProgress(id);
  }

  @Patch(':id/completed')
  markCompleted(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.markCompleted(id);
  }
}
