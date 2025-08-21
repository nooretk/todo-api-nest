import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { UpdateTitleDto } from './dto/update-title.dto';

@ApiTags('todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new todo',
    description: 'Creates a new todo item with the provided title',
  })
  @ApiCreatedResponse({
    description: 'The todo has been successfully created',
    type: Todo,
  })
  @ApiBody({ type: CreateTodoDto })
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all todos',
    description: 'Retrieves a list of all todo items',
  })
  @ApiOkResponse({
    description: 'List of all todo items',
    type: [Todo],
  })
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a todo by ID',
    description: 'Retrieves a specific todo item by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the todo item',
    type: 'number',
  })
  @ApiOkResponse({
    description: 'The todo item',
    type: Todo,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Patch(':id/title')
  @ApiOperation({
    summary: 'Update todo title',
    description: 'Updates the title of a specific todo item',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the todo item',
    type: 'number',
  })
  @ApiBody({ type: UpdateTitleDto })
  @ApiOkResponse({
    description: 'The updated todo item',
    type: Todo,
  })
  updateTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTitleDto,
  ): Todo {
    return this.todoService.updateTitle(id, dto.title);
  }

  @Patch(':id/in-progress')
  @ApiOperation({
    summary: 'Mark todo as in progress',
    description: 'Marks a specific todo item as in progress',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the todo item',
    type: 'number',
  })
  @ApiOkResponse({
    description: 'The updated todo item marked as in progress',
    type: Todo,
  })
  markInProgress(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.markInProgress(id);
  }

  @Patch(':id/completed')
  @ApiOperation({
    summary: 'Mark todo as completed',
    description: 'Marks a specific todo item as completed',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the todo item',
    type: 'number',
  })
  @ApiOkResponse({
    description: 'The updated todo item marked as completed',
    type: Todo,
  })
  markCompleted(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.markCompleted(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a todo',
    description: 'Deletes a specific todo item by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the todo item to delete',
    type: 'number',
  })
  @ApiOkResponse({
    description: 'The deleted todo item',
    type: Todo,
  })
  remove(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.remove(id);
  }
}
