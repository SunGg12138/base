import logger from '../lib/logger';

export default async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = 500;
        ctx.body = { msg: '操作失败', error: err };
        logger.error('catchError', err, {
            method: ctx.request.method,
            url: ctx.request.url,
            query: ctx.request.query,
            body: ctx.request.body,
            params: ctx.request.params,
        });
    }
};
