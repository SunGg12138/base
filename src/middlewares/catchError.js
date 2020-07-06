/**
 * 捕捉错误中间件
 */
module.exports = async function (ctx, next) {
    try {
        await next();
    } catch (error) {
        ctx.status = 500;
        ctx.body = { msg: '意外的错误' };
        console.log('意外的错误:', error);
    }
};