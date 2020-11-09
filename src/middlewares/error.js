/**
 * 响应错误中间件
 */
module.exports = async function (ctx, next) {
    ctx.error = {
        param() {
            ctx.status = 400;
            ctx.body = { msg: '参数不全' };
        },
        paramError() {
            ctx.status = 400;
            ctx.body = { msg: '参数错误' };
        },
        auth() {
            ctx.status = 401;
            ctx.body = { msg: '权限不足' };
        },
        loginInvalid() {
            ctx.status = 401;
            ctx.body = { msg: '登录失效' };
        },
        notFound() {
            ctx.status = 404;
            ctx.body = { msg: 'not found' };
        },
        // 服务异常错误
        server(error) {
            ctx.status = 500;
            ctx.body = { msg: '意外的错误' };
            console.log('意外的错误:', error);
        },
        // 自定义消息
        msg(msg) {
            ctx.status = 400;
            ctx.body = { msg };
        },
    };

    await next();
};