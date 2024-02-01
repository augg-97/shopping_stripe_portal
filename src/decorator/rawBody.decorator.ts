import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RawBody = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data: unknown, ctx: ExecutionContext): any => {
    const { body } = ctx.switchToHttp().getRequest();
    console.log("🚀 ~ body:", body);
    return body;
  },
);
