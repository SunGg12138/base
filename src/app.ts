import Koa from 'koa';
import * as path from 'path';
import * as render from 'koa-ejs';
import * as bodyParser from 'koa-bodyparser';
import routes from './routes';
import catchErrorMiddleware from './middlewares/catchError';
import visitMiddleware from './middlewares/visit';
import minifyMiddleware from './middlewares/minify';
import * as koaStatic from 'koa-static';

const app = new Koa();

render(app, {
    root: path.join(__dirname, '../views'),
    layout: 'layout/layout',
    viewExt: 'html',
    cache: false,
    debug: true
});

app
.use(koaStatic(path.join(__dirname, '../public')))
.use(catchErrorMiddleware)
.use(bodyParser())
.use(visitMiddleware)
.use(minifyMiddleware)
.use(routes.routes())
.use(routes.allowedMethods());

export default app;
