/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Todo } from '@prisma/client';

export const GetTodo = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: { todo: Todo } = ctx.switchToHttp().getRequest();
    if (data) {
      return request.todo[data];
    }
    return request.todo;
  },
);
