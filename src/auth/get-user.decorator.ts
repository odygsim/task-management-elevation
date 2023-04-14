import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

// "data" is the data you wish to pass to the decorator
// "ctx" is the execution context - we are using it instead of request (older version had request)
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
