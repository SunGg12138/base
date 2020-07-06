const Koa = require('koa');
const app = new Koa();

// 访问记录中间件
app.use(require('./middlewares/visit'));
// 捕捉错误中间件
app.use(require('./middlewares/catchError'));
// api:v1 路由
app.use(require('./routes/v1'));

module.exports = app;