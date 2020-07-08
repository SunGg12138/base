const Koa = require('koa');
const app = new Koa();

// 允许跨域
app.use(require('./middlewares/cors'));
// 响应错误的中间件
app.use(require('./middlewares/error'));
// 访问记录中间件
app.use(require('./middlewares/visit'));
// 捕捉错误中间件
app.use(require('./middlewares/catchError'));
// api:v1 路由
app.use(require('./routes/v1'));

// 404响应
app.use(async (ctx) => {
    ctx.error.notFound();
});

module.exports = app;