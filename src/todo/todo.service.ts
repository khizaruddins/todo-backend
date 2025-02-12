import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodos() {
    // const todos = await this.prisma.todo.();
  }

  async createTodo(todoDto: TodoDto) {
    // create todo

    // check userId
    const userId = await this.prisma.user.findUnique({
      where: {
        id: todoDto.userId,
      },
    });
    if (!userId) throw new ForbiddenException('No such user exists');

    const todo = await this.prisma.todo.create({
      data: {
        title: todoDto.title,
        description: todoDto.description,
        startDate: todoDto.startDate,
        endDate: todoDto.endDate,
        progressStatus: todoDto.progressStatus,
        tag: todoDto.tag,
        userId: todoDto.userId,
      },
    });
    // return newly created todo

    return todo;
  }

  editTodo() {
    // // fetch todo
    // const todo = this.prisma.todo.findUnique({
    //   where: {
    //     id: todoDto.id,
    //   },
    // });
    // change todo

    // save todo to db

    // return saved todo

    return { hello: 'hello' };
  }

  deleteTodo() {
    return { todo: 'Deleted Todo' };
  }
}
