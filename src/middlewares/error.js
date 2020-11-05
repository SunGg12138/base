/**
 * 响应错误中间件
 */
module.exports = async function (ctx, next) {
    ctx.error = {
        param() {
            ctx.status = 400;
            ctx.protobuf(null, { msg: '参数不全' });
        },
        paramError() {
            ctx.status = 400;
            ctx.protobuf(null, { msg: '参数错误' });
        },
        auth() {
            ctx.status = 401;
            ctx.protobuf(null, { msg: '权限不足' });
        },
        loginInvalid() {
            ctx.status = 401;
            ctx.protobuf(null, { msg: '登录失效' });
        },
        notFound() {
            ctx.status = 404;
            ctx.protobuf(null, { msg: 'not found' });
        },
        // 服务异常错误
        server(error) {
            ctx.status = 500;
            ctx.protobuf(null, { msg: '意外的错误' });
        },
        // 自定义消息
        msg(msg) {
            ctx.status = 400;
            ctx.protobuf(null, { msg });
        }
    };

    await next();
};