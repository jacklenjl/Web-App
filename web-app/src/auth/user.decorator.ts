import { createParamDecorator } from '@nestjs/common';

export const UserData = createParamDecorator((data, req) => {
  return req.user;
});
