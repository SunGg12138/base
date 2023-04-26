import logger from '../lib/logger';

/**
 * 记录访问请求和响应的信息以及访问速度的中间件
 */
export default async function(ctx, next) {
  const start = Date.now();

  logger.info('Visit request start', {
    method: ctx.request.method,
    url: ctx.request.url,
    query: ctx.request.query,
    body: ctx.request.body,
    params: ctx.request.params,
  });

  await next();

  // 计算响应时间
  const end = Date.now();
  const responseTime = end - start;

  logger.info('Visit request end', {
    method: ctx.request.method,
    url: ctx.request.url,
    status: ctx.status,
    responseTime,
  });
};
