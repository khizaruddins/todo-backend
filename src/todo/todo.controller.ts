import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto';
import { Todo } from '@prisma/client';
import { GetTodo } from 'src/auth/decorator/get-todo.decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos(@GetTodo() todo: Todo) {
    console.log(todo);
    return todo;
  }

  @Post()
  createTodo(@Body() todoDto: TodoDto) {
    return this.todoService.createTodo(todoDto);
  }

  @Put()
  editTodo() {
    return this.todoService.editTodo();
  }

  @Delete()
  deleteTodo() {
    return this.todoService.deleteTodo();
  }
}
