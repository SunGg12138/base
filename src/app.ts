import Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import routes from './routes';
import catchErrorMiddleware from './middlewares/catchError';
import visitMiddleware from './middlewares/visit';

const app = new Koa();

app
.use(catchErrorMiddleware)
.use(visitMiddleware)
.use(bodyParser())
.use(routes.routes())
.use(routes.allowedMethods());

export default app;
