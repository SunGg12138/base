/**
 * 响应错误中间件
 */
module.exports = async function (ctx, next) {
    ctx.error = {
        param() {
            ctx.status = 400;
            const msg = { msg: '参数不全' };
            if (typeof ctx.protobuf === 'function') {
                ctx.protobuf(null, msg);
            } else {
                ctx.body = msg;
            }
        },
        paramError() {
            ctx.status = 400;
            const msg = { msg: '参数错误' };
            if (typeof ctx.protobuf === 'function') {
                ctx.protobuf(null, msg);
            } else {
                ctx.body = msg;
            }
        },
        auth() {
            ctx.status = 401;
            const msg = { msg: '权限不足' };
            if (typeof ctx.protobuf === 'function') {
                ctx.protobuf(null, msg);
            } else {
                ctx.body = msg;
            }
        },
        loginInvalid() {
            ctx.status = 401;
            const msg = { msg: '登录失效' };
            if (typeof ctx.protobuf === 'function') {
                ctx.protobuf(null, msg);
            } else {
                ctx.body = msg;
            }
        },
        notFound() {
            ctx.status = 404;
            const msg = { msg: 'not found' };
            if (typeof ctx.protobuf === 'function') {
                ctx.protobuf(null, msg);
            } else {
                ctx.body = msg;
            }
        },
        // 服务异常错误
        server(error) {
            ctx.status = 500;
            const msg = { msg: '意外的错误' };
            if (typeof ctx.protobuf === 'function') {
                ctx.protobuf(null, msg);
            } else {
                ctx.body = msg;
            }
            console.log('意外的错误:', error);
        },
        // 自定义消息
        msg(msg) {
            ctx.status = 400;
            if (typeof ctx.protobuf === 'function') {
                ctx.protobuf(null, { msg });
            } else {
                ctx.body = msg;
            }
        },
    };


    await next();
};