import * as Koa from "koa";

declare module 'koa' {
    interface Request {
        // validations校验后会挂载到ctx.request上
        data: {
            body: Record<string, any>,
            query: Record<string, any>,
            params: Record<string, any>,
        };
    }
}
