// 允许跨域
module.exports = async function (ctx, next) {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "content-Type,token,authorization");
    ctx.set("Access-Control-Allow-Methods", "PATCH,PUT,POST,GET,DELETE,OPTIONS");
    ctx.set("Access-Control-Allow-Credentials", "true");
    ctx.set("Content-Type", "application/json;charset=utf-8");
  
    if (ctx.request.method === 'OPTIONS') ctx.body = { msg: 'ok' };
    else await next();
};