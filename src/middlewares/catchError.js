/**
 * 捕捉错误中间件
 */
module.exports = async function (ctx, next) {
    try {
        await next();
    } catch (error) {
        console.log(error);
        ctx.error.server(error);
    }
};