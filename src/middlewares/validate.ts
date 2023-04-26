import Joi from 'joi';
import { Context, Next } from 'koa';

/**
 * 参数校验中间件
*/
export default function (joi: Joi.AnySchema) {

    if (!joi || !joi.validate) throw new Error('validate middleware argument must be joi');

    return async function (ctx: Context, next: Next) {
        const { error, value } = joi.validate({
            query: ctx.request.query,
            body: ctx.request.body,
            params: ctx.params,
        });

        if (error) {
            ctx.status = 400;
            ctx.body = { code: 400, msg: error };
            return;
        }

        ctx.request.data = value;

        await next();
    };
};
