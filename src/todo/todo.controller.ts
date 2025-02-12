import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/')
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post('/')
  createTodo(@Body() todoDto: TodoDto) {
    return this.todoService.createTodo(todoDto);
  }

  @Put('/')
  editTodo() {
    return this.todoService.editTodo();
  }

  @Delete('/')
  deleteTodo() {
    return this.todoService.deleteTodo();
  }
}
