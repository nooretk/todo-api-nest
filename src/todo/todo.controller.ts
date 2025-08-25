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
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('todos')
@Controller('todos')
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
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
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
  async findAll(): Promise<Todo[]> {
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
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
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
  async updateTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTitleDto,
  ): Promise<Todo> {
    return this.todoService.updateTitle(id, dto.title);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Update todo status',
    description: 'Updates the status of a specific todo item',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the todo item',
    type: 'number',
  })
  @ApiBody({ type: UpdateStatusDto })
  @ApiOkResponse({
    description: 'The updated todo item',
    type: Todo,
  })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Promise<Todo> {
    return this.todoService.updateStatus(id, dto.status);
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
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.remove(id);
  }
}
